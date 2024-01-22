'use client'

import LoadingModal from "@/components/shared/LoadingModal";
import CustomButton from "@/components/ui/custom/CustomButton";
import CustomInput from "@/components/ui/custom/CustomInput";
import { handleResetPasswordAction } from "@/lib/actions";
import { ResetPasswordSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
    onSuccess: () => void;
    accountInfo: (data: any) => void;
}

const ResetPasswordForm = ({ onSuccess, accountInfo }: Props) => {
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(ResetPasswordSchema)
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        startTransition(() => {
            handleResetPasswordAction(data?.email).then((data) => {
                if (data?.status) {
                    toast.error(data?.message)
                } else {
                    accountInfo(data?.user?.email)
                    onSuccess()
                }
            }).catch(() => toast.error("Someting went wrong!"))
        })

    }

    return (
        <>
            {isPending && <LoadingModal />}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 items-center"
            >
                <div className="flex flex-col items-center justify-center gap-5">
                    <h3 className="text-3xl font-bold">Reset your password</h3>
                    <span className="font-medium text-lg text-center text-secondary">
                        Don't worry! It occurs. Please enter the email address linked with your account.
                    </span>
                </div>


                <CustomInput
                    id="email"
                    label="Email"
                    disabled={isPending}
                    register={register}
                    errors={errors}
                    required
                />

                <div className="w-full">
                    <CustomButton disabled={isPending} fullWidth type="submit">
                        {isPending ? 'loading...' : 'Send Code'}
                    </CustomButton>
                </div>
            </form>
        </>
    );
}

export default ResetPasswordForm;
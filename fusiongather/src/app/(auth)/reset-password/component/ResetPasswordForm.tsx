'use client'

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { handleResetPasswordAction } from "@/lib/actions";
import { ResetPasswordSchema } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
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
        handleResetPasswordAction(data?.email).then((data) => {
            if (data?.status) {
                toast.error(data?.message)
            } else {
                accountInfo(data?.user?.email)
                onSuccess()
            }
        }).catch(() => toast.error("Someting went wrong!"))
    }

    return (
        <>
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


                <Input
                    id="email"
                    label="Email"
                    disabled={isPending}
                    register={register}
                    errors={errors}
                    required
                />

                <div className="w-full">
                    <Button disabled={isPending} fullWidth type="submit">
                        {isPending ? 'loading...' : 'Send Code'}
                    </Button>
                </div>
            </form>
        </>
    );
}

export default ResetPasswordForm;
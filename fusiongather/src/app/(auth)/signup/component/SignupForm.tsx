'use client'

import CustomButton from "@/components/ui/custom/CustomButton"
import CustomInput from "@/components/ui/custom/CustomInput"
import Link from "next/link"
import { useState, useTransition } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from "@/lib/validation/auth"
import { handleSignUpAction } from "@/lib/actions/authen"
import toast from "react-hot-toast"
import VerifyCode from "../../reset-password/component/VerifyCode"
import Logo from "@/components/main/Logo"
import LoadingModal from "@/components/shared/LoadingModal"

const SignupForm = () => {
    const [verifyCode, setVerifyCode] = useState<boolean>(false)
    const [accountInfo, setAccountInfo] = useState<string>("");
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            phoneNumber: '',
            dob: ''
        },
        resolver: zodResolver(SignupSchema)
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        startTransition(() => {
            handleSignUpAction(data).then((data) => {
                if (data?.error) {
                    toast.error(data?.message)
                } else {
                    console.log("ok", data);
                    toast.success('Create account successfully!')
                    setVerifyCode(true)
                    setAccountInfo(data?.username)
                }
            }).catch(() => toast.error("Someting went wrong!"))
        })

    }

    return (
        <>
            {isPending && <LoadingModal />}
            {verifyCode ?
                <VerifyCode length={6} accountInfo={accountInfo} type="verifyCode" />
                :
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 items-center"
                >
                    <Logo />
                    <h3 className="text-3xl font-medium">Sign up</h3>

                    <div className="flex gap-3">
                        <CustomInput
                            id="firstName"
                            label="Fisrt Name"
                            disabled={isPending}
                            register={register}
                            errors={errors}
                            required
                        />
                        <CustomInput
                            id="lastName"
                            label="Last Name"
                            disabled={isPending}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>

                    <CustomInput
                        id="email"
                        label="Email"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <CustomInput
                        id="phoneNumber"
                        label="Phone Number"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <CustomInput
                        id="dob"
                        label="Date Of Birth"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <CustomInput
                        id="username"
                        label="Username"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />

                    <CustomInput
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />

                    <div className="w-full">
                        <CustomButton disabled={isPending} fullWidth type="submit">
                            Create Account
                        </CustomButton>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 text-secondary">
                        <div className="flex gap-1 items-center justify-center text-base px-2">
                            <span>
                                Already have an account?
                            </span>
                            <Link
                                className="cursor-pointer font-semibold text-black hover:opacity-75"
                                href={"/login"}>
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            }
        </>
    );
}

export default SignupForm;
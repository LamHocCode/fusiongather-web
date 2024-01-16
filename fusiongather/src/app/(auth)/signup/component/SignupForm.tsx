'use client'

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { useState, useTransition } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from "@/lib/validation/auth"
import { handleSignUpAction } from "@/lib/actions"
import toast from "react-hot-toast"
import VerifyCode from "../../reset-password/component/VerifyCode"
import Logo from "@/components/main/Logo"

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
            {verifyCode ?
                <VerifyCode accountInfo={accountInfo} type="verifyCode" />
                :
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 items-center"
                >
                    <Logo />
                    <h3 className="text-3xl font-medium">Sign up</h3>

                    <div className="flex gap-3">
                        <Input
                            id="firstName"
                            label="Fisrt Name"
                            disabled={isPending}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="lastName"
                            label="Last Name"
                            disabled={isPending}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>

                    <Input
                        id="email"
                        label="Email"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="phoneNumber"
                        label="Phone Number"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="dob"
                        label="Date Of Birth"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="username"
                        label="Username"
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                    />

                    <Input
                        disabled={isPending}
                        register={register}
                        errors={errors}
                        required
                        id="password"
                        label="Password"
                        type="password"
                    />

                    <div className="w-full">
                        <Button disabled={isPending} fullWidth type="submit">
                            {isPending ? 'loading...' : 'Create Account'}
                        </Button>
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
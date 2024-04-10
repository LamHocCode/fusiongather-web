'use client'

import CustomButton from "@/components/ui/custom/CustomButton";
import CustomInput from "@/components/ui/custom/CustomInput";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/lib/validation/auth";
import { LoginAction } from "@/lib/actions/login";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import LoadingModal from "@/components/shared/LoadingModal";

const LoginForm = () => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl")

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        startTransition(() => {
            LoginAction(data).then((data) => {
                if (data?.error) {
                    reset()
                    toast.error(data.error)
                } else {
                    reset()
                    router.push(`${callbackUrl ? callbackUrl : DEFAULT_LOGIN_REDIRECT}`)
                    toast.success("LoggedIn!")
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
                <div>
                    <span className="text-4xl font-extrabold text-primary drop-shadow-2xl shadow-rose-900 textShadow">FusionGather</span>
                </div>
                <h3 className="text-3xl font-medium">Log in</h3>
                {/* <button type="button" className="w-full border-2 border-black rounded-md bg-white flex items-center justify-center gap-[10px] py-4 hover:bg-slate-100">
                    <FcGoogle size={"20px"} />
                    <span className="font-semibold text-base">
                        Continue with Google
                    </span>
                </button> */}
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-secondary text-secondary">
                            Enter your Credential
                        </span>
                    </div>
                </div>

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
                        Sign in
                    </CustomButton>
                </div>

                <div className="flex flex-col items-center justify-center gap-5 text-secondary">
                    <Link
                        className="underline hover:opacity-75 text-sm"
                        href={"/reset-password"}>
                        Forgot Password?
                    </Link>
                    <div className="flex gap-1 items-center justify-center text-base px-2">
                        <span>
                            Don't have an account?
                        </span>
                        <Link
                            className="cursor-pointer font-semibold text-black hover:opacity-75"
                            href={"/signup"}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </form>
        </>
    );
}

export default LoginForm;
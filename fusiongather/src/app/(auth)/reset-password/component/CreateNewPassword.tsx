'use client'

import CustomButton from "@/components/ui/custom/CustomButton"
import CustomInput from "@/components/ui/custom/CustomInput"
import { useTransition } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateNewPasswordSchema } from "@/lib/validation/auth"
import { handleNewPasswordAction } from "@/lib/actions/authen"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
interface Props {
    accountInfo: string
}
const CreateNewPassword = ({ accountInfo }: Props) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()


    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            newPassword: '',
            confirmPassword: ''
        },
        resolver: zodResolver(CreateNewPasswordSchema)
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        startTransition(() => {
            handleNewPasswordAction(accountInfo, data.newPassword).then((data) => {
                if (data) {
                    toast.success('Succeed!')
                    router.push("/login")
                } else {
                    toast.error("Failed!")
                }
            }).catch(() => toast.error("Someting went wrong!"))
        })
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center"
        >
            <div className="flex flex-col items-center justify-center gap-5">
                <h3 className="text-3xl font-bold">Create a New Password</h3>
                <span className="font-medium text-lg text-secondary">
                    Your new password must be unique from those previously used.
                </span>
            </div>
            <CustomInput
                id="newPassword"
                label="New Password"
                type="password"
                disabled={isPending}
                register={register}
                errors={errors}
                required
            />
            <CustomInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                disabled={isPending}
                register={register}
                errors={errors}
                required
            />
            <div className="w-full">
                <CustomButton disabled={isPending} fullWidth type="submit">
                    {isPending ? 'loading...' : 'Reset Password'}
                </CustomButton>
            </div>
        </form>
    );
}

export default CreateNewPassword;
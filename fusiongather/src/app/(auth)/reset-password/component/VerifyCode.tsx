'use client'

import CountDown from "@/components/main/CountDown";
import CustomButton from "@/components/ui/custom/CustomButton";
import { handleCheckCodeAction, handleVerifyCodeAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6"

interface Props {
    accountInfo: string;
    onSuccess?: () => void;
    type: string
}

const VerifyCode = ({ onSuccess, accountInfo, type }: Props) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isCountdownRunning, setIsCountdownRunning] = useState<boolean>(true);
    const inputRefs = useRef([...Array(6)].map(() => React.createRef<HTMLInputElement>()));
    console.log("check :", accountInfo);


    const { handleSubmit, control } = useForm<FieldValues>({
        defaultValues: {
            number1: '',
            number2: '',
            number3: '',
            number4: '',
            number5: '',
            number6: '',
        }
    })


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        const code = Object.keys(data)
            .sort()
            .map((key) => data[key])
            .join('');
        try {
            if (type === "reset") {
                const res = await handleCheckCodeAction(accountInfo, code)
                if (res) {
                    setIsCountdownRunning(false);
                    onSuccess!()
                } else {
                    toast.error('Failed!')
                }
            } else if (type === "verifyCode") {
                const res = await handleVerifyCodeAction(accountInfo, code)
                console.log(">>>check Verification code:", res);
                if (res.status === 404) {
                    toast.error(res?.message)
                } else {
                    setIsCountdownRunning(false);
                    toast.success('Verified!')
                    router.push('/login')
                }
            }
        } catch (error: any) {
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center relative"
        >
            <div
                className="absolute left-0 top-1 cursor-pointer">
                <FaArrowLeftLong size="28px" />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
                <h3 className="text-3xl font-bold">Code Verification</h3>
                <span className="font-medium text-lg text-secondary">
                    Enter the verification code we just sent on your email address.
                </span>
            </div>
            <span className="text-primary font-bold text-xl my-10">
                The mail was sent succesfuly!
            </span>
            <div className="flex gap-5">
                {[...Array(6)].map((_, index) => (
                    <Controller
                        key={index}
                        name={`number${index + 1}`}
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <input
                                {...field}
                                maxLength={1}
                                autoComplete="off"
                                className="w-[43px] h-[43px] border-2 outline-none border-black rounded-md text-center font-bold text-2xl"
                                autoFocus={index === 0}
                                ref={inputRefs.current[index]}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    field.onChange(e);
                                    if (e.target.value !== '' && index < 5) {
                                        inputRefs.current[index + 1].current!.focus();
                                    }
                                }}
                            />
                        )}
                    />
                ))}
            </div>
            <div className="flex gap-1 text-secondary text-sm mb-10">
                <span>The email will be resent in </span>
                <CountDown currentTime="00:59" isRunning={isCountdownRunning} />
            </div>

            <div className="w-full">
                <CustomButton disabled={isLoading} fullWidth type="submit">
                    {isLoading ? 'loading...' : 'Confirm'}
                </CustomButton>
            </div>
        </form>
    );
}

export default VerifyCode;
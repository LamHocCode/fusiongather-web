'use client'

import CountDown from "@/components/main/CountDown";
import Loading from "@/components/shared/Loading";
import LoadingModal from "@/components/shared/LoadingModal";
import { handleCheckCodeAction, handleVerifyCodeAction } from "@/lib/actions/authen";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6"

interface Props {
    accountInfo: string;
    onSuccess?: () => void;
    type: string,
    length: number,
    handleBack?: () => void;
}

const VerifyCode = ({ onSuccess, accountInfo, type, length, handleBack }: Props) => {
    const router = useRouter()
    const [isCountdownRunning, setIsCountdownRunning] = useState<boolean>(true);
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isPending, startTranstion] = useTransition()

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, e: any) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
        if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
    };

    const handleClick = (index: number) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        if (index > 0 && (!otp[index - 1])) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index: number, e: any) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1].focus();
        }
    };



    const onOtpSubmit = async (code: string) => {
        startTranstion(() => {
            if (type === "reset") {
                handleCheckCodeAction(accountInfo, code).then((res) => {
                    if (res) {
                        setIsCountdownRunning(false);
                        onSuccess!()
                    } else {
                        toast.error('Failed!')
                    }
                })

            } else if (type === "verifyCode") {
                handleVerifyCodeAction(accountInfo, code).then((res) => {
                    if (res.status === 404) {
                        toast.error(res?.message)
                    } else {
                        setIsCountdownRunning(false);
                        toast.success('Verified!')
                        router.push('/login')
                    }
                })
            }
        })
    }


    return (
        <>
            {isPending && <LoadingModal />}
            <div
                className="flex flex-col gap-6 items-center relative"
            >
                <div
                    className="absolute left-0 top-1 cursor-pointer"
                    onClick={handleBack}>
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
                    {otp.map((value, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                ref={(input) => (inputRefs.current[index] = input!)}
                                value={value}
                                onChange={(e) => handleChange(index, e)}
                                onClick={() => handleClick(index)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-[43px] h-[43px] border-2 outline-none border-black rounded-md text-center font-bold text-2xl"
                            />
                        );
                    })}
                </div>
                <div className="flex gap-1 text-secondary text-sm">
                    {!isPending &&
                        <>
                            <span>The email will be resent in </span>

                            <CountDown currentTime="00:59" isRunning={isCountdownRunning} />
                        </>
                    }
                </div>
            </div>
        </>

    );
}

export default VerifyCode;
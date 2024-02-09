'use client'

import { useState } from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import VerifyCode from './VerifyCode';
import CreateNewPassword from './CreateNewPassword';

const Reset = () => {
    const [resetStep, setResetStep] = useState<"reset" | "verify" | "createNew">('reset'); // 'reset', 'verify', 'createNew'
    const [accountInfo, setAccountInfo] = useState<string>("")

    const handleSendMailSuccess = () => {
        setResetStep('verify');
    };

    const handleVerificationSuccess = () => {
        setResetStep('createNew');
    };

    const handleAccountInfo = (data: any) => {
        setAccountInfo(data)
    }

    const handleBack = () => {
        if (resetStep === "verify") {
            setResetStep("reset")
        }
    }

    return (
        <>
            {resetStep === 'reset' && <ResetPasswordForm onSuccess={handleSendMailSuccess} accountInfo={handleAccountInfo} />}
            {resetStep === 'verify' && <VerifyCode handleBack={handleBack} length={6} type="reset" onSuccess={handleVerificationSuccess} accountInfo={accountInfo} />}
            {resetStep === 'createNew' && <CreateNewPassword accountInfo={accountInfo} />}
        </>
    );
};

export default Reset;
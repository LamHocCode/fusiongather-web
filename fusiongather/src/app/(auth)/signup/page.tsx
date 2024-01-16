import { Metadata } from "next";
import SignupForm from "./component/SignupForm";
import VerifyCode from "../reset-password/component/VerifyCode";

export async function generateMetadata(): Promise<Metadata> {
    try {
        return {
            title: "Signup",
            description: 'This is signup page of Fasion Gather',
            robots: {
                index: false,
                follow: true,
                nocache: true
            }
        }
    } catch (error: any) {
        console.log(error);
        return {
            title: 'Not Found',
            description: 'The page you are looking for does not exist.'
        }

    }
}

const RegisterPage = () => {
    return (
        <>
            <SignupForm />
        </>
    );
}

export default RegisterPage;
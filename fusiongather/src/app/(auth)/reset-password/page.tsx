import { Metadata } from "next";
import Reset from "./component/Reset";

export async function generateMetadata(): Promise<Metadata> {
    try {
        return {
            title: "Reset password",
            description: 'This is reset password page of Fasion Gather',
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

const ResetPasswordPage = () => {
    return (
        <>
            <Reset />
        </>
    );
}

export default ResetPasswordPage;
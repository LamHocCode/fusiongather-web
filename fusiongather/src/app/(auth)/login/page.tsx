import { Metadata } from "next";
import LoginForm from "./component/LoginForm";

export async function generateMetadata(): Promise<Metadata> {
    try {
        return {
            title: "Login",
            description: 'This is login page of Fasion Gather',
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

const LoginPage = () => {
    return (
        <>
            <LoginForm />
        </>
    );
}

export default LoginPage;
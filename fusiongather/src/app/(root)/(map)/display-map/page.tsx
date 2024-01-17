import { Metadata } from "next";
import DisplayMap from "./component/displayMap";

export async function generateMetadata(): Promise<Metadata> {
    try {
        return {
            title: "Display Map",
            description: 'This is Display Map of Fasion Gather',
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

const DisplayMapPage = () => {
    return (
        <>
            <DisplayMap />
        </>
    );
}

export default DisplayMapPage;
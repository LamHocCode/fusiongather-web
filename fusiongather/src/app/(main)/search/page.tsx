import { HiOutlineLightBulb } from "react-icons/hi2";
import { Metadata } from "next";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
    try {
        return {
            title: `Search Results: ${searchParams.keyword}`,
            description: `Matching search results for: ${searchParams.category} on FusionGather`,
            robots: {
                index: false,
                follow: true,
                nocache: true
            },
        }
    } catch (error: any) {
        console.log(error);
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist."
        }
    }
}

const page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {

    return (
        <>
            <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <HiOutlineLightBulb size={20} className="text-gray-500" />
                    <span className="text-gray-500 font-medium">
                        Search results for keywords
                    </span>
                    <span className="text-primary">
                        &apos;{searchParams.keyword}&apos;
                    </span>
                </div>
            </div>
        </>
    );
}

export default page;

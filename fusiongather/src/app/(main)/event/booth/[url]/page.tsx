import BackgroupImage from "@/components/layout/BackgroupImage";
import { Metadata } from "next";
import { getBoothById } from "@/lib/actions/booth";
import BoothDetailPage from "@/app/(main)/event/booth/[url]/component/BoothDetail";

interface Props {
    params: {
        url: number
    }
}

export async function generateMetadata({ params: { url } }: Props): Promise<Metadata> {
    try {
        let booth = url
        if (!booth) {
            return {
                title: "Not Found",
                description: "The page you are looking for does not exist."
            }
        }
        return {
            title: String(url),
            description: String(url)
        }
    } catch (error: any) {
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist."
        }
    }
}

export default async function BoothDetail({ params: { url } }: Props) {
    const booth = await getBoothById(url)
    return (
        <main className="mt-[90px] min-h-screen">
            <BackgroupImage src="/test-booth.jpg" page="detail" />
            <BoothDetailPage booth={booth}/>
        </main>
    )
}
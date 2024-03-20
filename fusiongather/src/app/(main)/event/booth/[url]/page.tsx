import BackgroupImage from "@/components/layout/BackgroupImage";
import { Metadata } from "next";
import { getBoothById } from "@/lib/actions/booth";
import BoothDetailPage from "@/app/(main)/event/booth/[url]/component/BoothDetail";
import { getImagesByBoothId } from "@/lib/actions/image";
import boothErrorImage from '../../public/test-booth.jpg'

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
    const boothImage = await getImagesByBoothId(url)
    return (
        <main className="mt-[90px] min-h-screen">
            {boothImage.length !==0 ? <BackgroupImage src={boothImage[0].url} page="detail" />
            : <BackgroupImage src="https://utfs.io/f/e9e6f4d9-b367-4c7f-925b-57fd1839b6cb-lcto2t.jpg" page="detail" />} 
            {/* //thay url này thành 1 url của ảnh lỗi */}
            <BoothDetailPage booth={booth}/>
        </main>
    )
}
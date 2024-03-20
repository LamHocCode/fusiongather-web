import BackgroupImage from "@/components/layout/BackgroupImage";
import { Metadata } from "next";
import Content from "./component/Content";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";
import Link from "next/link";
import BoothPage from "../booth/page";


interface Props {
    params: {
        url: string
    }
}

export async function generateMetadata({ params: { url } }: Props): Promise<Metadata> {
    try {
        // const parts = slug.split('.');
        // const eventId = parts[1]
        let event = url
        if (!event) {
            return {
                title: "Not Found",
                description: "The page you are looking for does not exist."
            }
        }
        return {
            title: url,
            description: url
        }
    } catch (error: any) {
        return {
            title: "Not Found",
            description: "The page you are looking for does not exist."
        }
    }
}

export default async function EventDetail({ params: { url } }: Props) {
    const id = Number(url)
    const event: EventType = await getEventById(id);
    return (
        <main className="mt-[90px] min-h-screen">
            <BackgroupImage src={event.imageUrl} page="detail" />
            <Content event={event} />
            <BoothPage eventId={id} />
        </main>
        
    )
}
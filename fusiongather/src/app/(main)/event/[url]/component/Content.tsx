
import { get } from "http";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";

interface Props {
    params: {
        url: string
    }
}

const Content = async ({ params: { url } }: Props) => {
    const eventId = url;
    const event: EventType = await getEventById(eventId);
    return (
        <section className="flex gap-8 py-10">
            <div className="w-[61%]">
                <LeftContent {...event} />
            </div>
            <div className="w-[39%]">
                <RightContent {...event} />
            </div>
        </section>
    );
}

export default Content;
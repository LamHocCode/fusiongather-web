import { get } from "http";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";
interface Props {
    event: EventType,
}

const Content = async (event: Props) => {
    return (
        <section className="flex lg:flex-row flex-col gap-8 py-10">
            <div className="lg:w-3/5 w-full">
                <LeftContent {...event} />
            </div>
            <div className="lg:flex-1 w-full">
                <RightContent {...event} />
            </div>
        </section>
    );
}

export default Content;
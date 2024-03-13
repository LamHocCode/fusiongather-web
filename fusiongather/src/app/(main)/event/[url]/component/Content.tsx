
import { get } from "http";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";

interface Props {
    event: EventType
}

const Content = async (event: Props) => {
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
import Calendar from "@/components/main/Calendar";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import BoxTicket from "./BoxTicket";
import EventInfo from "./EventInfo";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";

interface Props {
    event: EventType
}

const LeftContent = async (data: Props) => {
    return (
        <>
            <div className="w-full flex items-start gap-8">
                <Calendar event={data.event}/>
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        {data.event.title}
                    </h3>
                    <EventInfo event={data.event}/>
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[64px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400">
                        <FaRegHeart />
                        <span className="text-secondary text-sm">4</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary"></div>
                </div>

                <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400">
                    <IoShareSocialOutline />
                    <span className="text-secondary text-sm">Share event</span>
                </div>
            </div>
            <div>
            <span dangerouslySetInnerHTML={{ __html: data.event.description }} suppressHydrationWarning></span>
            </div>
            <BoxTicket />
        </>
    );
}

export default LeftContent;
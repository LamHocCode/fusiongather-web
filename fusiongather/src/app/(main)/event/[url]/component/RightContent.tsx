"use client"

import Calendar from "@/components/main/Calendar";
import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import EventInfo from "./EventInfo";
import { getEventById } from "@/lib/actions/event";
import { EventType } from "@/lib/type";



const RightContent = (data: EventType) => {
    const [isShow, setIsShow] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsShow(scrollPosition >= 650);
            setIsHidden(scrollPosition >= 780)
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isShow ?
                <div className={`${isShow && "fixed top-[90px] bg-white w-[calc(39%-70px)] right-10 animate-right-content"} border p-4 rounded-md`}>
                    <div className="w-full flex items-start gap-2 mb-8">
                        <Calendar event={data}/>
                        <h3 className="text-lg text-gray-600 leading-normal mb-6">
                            {data.title}
                        </h3>
                    </div>
                    <div className="pb-4">
                        <EventInfo event={data} />
                    </div>
                    {!isHidden &&
                        <hr className="mb-4" />
                    }
                    <Ticket isHidden={isHidden} data={data}/>
                </div>
                :
                <div className="border p-4 rounded-md">
                    <Ticket isHidden={isHidden} data={data}/>
                </div>
            }
        </>
    );
}

export default RightContent;

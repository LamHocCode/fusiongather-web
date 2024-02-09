"use client"

import Calendar from "@/components/main/Calendar";
import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import EventInfo from "./EventInfo";

const RightContent = () => {
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
                        <Calendar />
                        <h3 className="text-lg text-gray-600 leading-normal mb-6">
                            UAN X YEAR END PARTY - MARKETING TRENDS 2024 & BEYOND
                            UAN X YEAR END PARTY - MARKETING TRENDS 2024 & BEYOND
                        </h3>
                    </div>
                    <div className="pb-4">
                        <EventInfo />
                    </div>
                    {!isHidden &&
                        <hr className="mb-4" />
                    }
                    <Ticket isHidden={isHidden} />
                </div>
                :
                <div className="border p-4 rounded-md">
                    <Ticket isHidden={isHidden} />
                </div>
            }
        </>
    );
}

export default RightContent;
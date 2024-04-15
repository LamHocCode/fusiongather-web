"use client"

import { EventType } from "@/lib/type";
import MyEventBox from "./MyEventBox";
import { useEffect, useState } from "react";
import Link from "next/link";

const MyEvents = ({ events }: { events: EventType[] }) => {
    const [data, setData] = useState<EventType[]>(events)
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {data && data.map((event, index) => {
                    return (
                            <MyEventBox key={index} data={event} />

                    )
                })}
            </div>
        </>

    );
}

export default MyEvents;
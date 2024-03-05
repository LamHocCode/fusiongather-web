"use client"

import { EventType } from "@/lib/type";
import PendingEventBox from "./PendingEventBox";
import { useEffect, useState } from "react";

const PendingEvents = ({ events }: { events: EventType[] }) => {
    const [data, setData] = useState<EventType[]>(events)
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {data && data.map((event, index) => {
                    return (
                        <PendingEventBox key={index} data={event} />
                    )
                })}
            </div>
        </>

    );
}

export default PendingEvents;
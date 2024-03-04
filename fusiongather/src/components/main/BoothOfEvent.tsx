"use client"

import { BoothType } from "@/lib/type";
import BoothBox from "./BoothBox";
import { useEffect, useState } from "react";

const BoothOfEvent = ({ booths }: { booths: BoothType[] }) => {
    const [data, setData] = useState<BoothType[]>(booths)
    console.log(booths[0].vendorId);
    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {data && data.map((booth, index) => {
                    return (
                        <BoothBox key={index} data={booth} />
                    )
                })}
            </div>
        </>

    );
}

export default BoothOfEvent;
import { BoothType } from "@/lib/type";
import BoothBox from "./BoothBox";
import { useEffect, useState } from "react";

const BoothOfEvent = ({ booths }: { booths: BoothType[] }) => {

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {booths.map((booth, index) => (
                    <BoothBox key={index} data={booth} />
                ))}
            </div>
        </>
    );
}

export default BoothOfEvent;

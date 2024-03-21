import { BoothType } from "@/lib/type";
import { useEffect, useState } from "react";
import BoothBox from "./BoothBox";

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

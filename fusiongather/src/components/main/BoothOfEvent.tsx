import { BoothType } from "@/lib/type";
import { useEffect, useState } from "react";
import VendorBoothBox from "./VendorBoothBox";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FiPlusCircle } from "react-icons/fi";
import BoothBox from "./BoothBox";

const BoothOfEvent = ({ booths, isOwner }: { booths: BoothType[], isOwner: boolean }) => {

    return (
        <>
            <div className="grid grid-cols-1 lg:w-3/5 w-full gap-8">
                {booths.map((booth, index) => (
                    <BoothBox key={index} data={booth} isOwner={isOwner}/>
                ))}
            </div>
        </>
    );
}

export default BoothOfEvent;

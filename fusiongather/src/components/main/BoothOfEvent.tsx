import { BoothType } from "@/lib/type";
import { useEffect, useState } from "react";
import VendorBoothBox from "./VendorBoothBox";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FiPlusCircle } from "react-icons/fi";
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

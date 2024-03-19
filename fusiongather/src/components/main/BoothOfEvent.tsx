import { BoothType } from "@/lib/type";
import BoothBox from "./BoothBox";
import { useEffect, useState } from "react";
import { getBoothByEventId } from "@/lib/actions/booth";

const BoothOfEvent = ({eventId} : {eventId: number}) => {

    const [booths, setBooths] = useState([]);
    const [isDelete, setIsDelete] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const boothData = await getBoothByEventId(eventId); 
            setBooths(boothData);
        } catch (error) {
            console.error("Error fetching booth data:", error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {booths ? booths.map((booths, index) => {
                    return (
                        <BoothBox key={index} data={booths} />
                        
                    ) 
                }) :  <div className="w-full text-center text-xl">No data</div>
            }
            </div>
        </>

    );
}

export default BoothOfEvent;
"use client";

import BoothOfEvent from "@/components/main/BoothOfEvent";
import { Button } from "@/components/ui/button";
import { checkIsEventOwner, getAllEvent, getEventById } from "@/lib/actions/event";
import { getBoothByEventId } from "@/lib/actions/booth"
import getSession from "@/lib/actions/getSession";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { BoothType } from "@/lib/type";
import { useState, useEffect } from "react";


const BoothPage = ({ eventId, isOwner }: { eventId: number, isOwner: boolean }) => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBoothByEventId(eventId);

        if (response.status === 200) {
          setBooths(response.data);
          setLoading(false);
        } else if (response.status === 404) {
          setBooths([]);
          setLoading(false);
        } else {
          setError(response.error || "An error occurred while fetching booth data.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching booth data:", error);
        setLoading(false);
      }
    };

    fetchData();


  }, [eventId]);


  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">
          Booth in event
        </div>

        <Link href={`/event/booth/create/${eventId}`}>
          {isOwner ?
            <Button type="button" className="min-w-[200px] h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-full hover:bg-primary/20">
              <FiPlusCircle className="mr-4" />
              Create Booth
            </Button> : null
          }
        </Link>

      </div>
      <div className="text-secondary mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {booths?.length === 0 ? (
              <div className="w-3/5 text-center font-semibold text-black/40 ">This event does not have any booths.</div>
            ) : (
              <BoothOfEvent booths={booths} isOwner={isOwner} />
            )}
          </>
        )}
      </div>
    </div>
  );
}


export default BoothPage;
"use client";

import LocationModal from "@/components/shared/LocationModal";
import { formatTime } from "@/lib/Format";
import { EventType } from "@/lib/type";
import Link from "next/link";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { RiMapPin2Line } from "react-icons/ri";

const EventInfo = (data: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCoords, setCurrentCoords] = useState<number[]>([
    Number(data.event.lng),
    Number(data.event.lat),
  ]); // [lng, lat]
  const status = "INFO";
  return (
    <>
      <LocationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentCoords={currentCoords}
        status={status}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <FaRegUserCircle size="24" />
          <Link href={"/"}>
            <span className="text-lg truncate">
              {data.event.author.firstName} {data.event.author.lastName}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6 ">
          <LiaCalendarWeekSolid size="24" />
          <div className="text-gray-600 text-sm leading-6">
            <div>{formatTime(data.event.startDateTime)}</div>
            <div>{formatTime(data.event.endDateTime)}</div>
          </div>
        </div>
        <div
          className="flex items-center gap-6 hover:text-orange-500 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <RiMapPin2Line size="24" />
          <span className="text-secondary text-sm truncate-2-line hover:text-orange-500 cursor-pointer">
            {data.event.location}
          </span>
        </div>
      </div>
    </>
  );
};

export default EventInfo;

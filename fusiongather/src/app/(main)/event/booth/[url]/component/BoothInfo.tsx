"use client";

import LocationModal from "@/components/shared/LocationModal";
import Link from "next/link";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuPartyPopper } from "react-icons/lu";

import { RiMapPin2Line } from "react-icons/ri";
import { BoothType } from "@/lib/type";

const BoothInfo = ({booth}: {booth: BoothType}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lng = Number(booth.longitude);
  const lat = Number(booth.latitude);
  const [currentCoords, setCurrentCoords] = useState<number[]>([lng, lat]); // [lng, lat]
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
              {booth.vendorId.firstName} {booth.vendorId.lastName}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6 ">
          <LuPartyPopper size="24" />
          <div className="text-gray-600 text-sm leading-6">
              {booth.eventId.title}
          </div>
        </div>
        <div
          className="flex items-center gap-6 hover:text-orange-500 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <RiMapPin2Line size="24" />
          <span className="text-secondary text-sm truncate-2-line hover:text-orange-500 cursor-pointer">
            Location
          </span>
        </div>
      </div>
    </>
  );
};

export default BoothInfo;

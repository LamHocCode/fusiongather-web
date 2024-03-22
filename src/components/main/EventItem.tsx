'use client'

import Image from "next/image";
import image from "../../../public/test-event.png";
import { LuHeart, LuMapPin } from "react-icons/lu";
import Link from "next/link";
import { CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";


interface EventItemProps {
  event: any;
  eventId: number;
}

const EventItem: React.FC<EventItemProps> = ({ event, eventId }) => {

  return (
    <div
      className="col-span-1 cursor-pointer border-[1px] border-slate-200 bg-slate-50 rounded-xl shadow-sm text-sm hover:shadow-xl transition-all duration-200"
    >
      <div className="w-full">
        <div className="overflow-hidden rounded-xl relative aspect-[2/1]">
          <Image
            src={image}
            alt={`event-image`}
            fill
            className="w-full h-full object-fill z-20"
          />
        </div>
        <div className="pt-2 pb-3 px-6 flex flex-col justify-between">
          <div>
            <div className="h-14 truncate-2-line">
              <div className="text-xl ">{event.title}</div>
            </div>
            <div className="py-3 text-xs w-full max-w-[190px]">
              <div className="truncate text-secondary pb-1">
                {event.producer}
              </div>
              <div className="flex flex-col gap-1 text-gray-700">
                <div>{event.time}</div>
                <div>{event.date}</div>              
              </div>
            </div>
            <div className="h-10 flex items-center gap-3">
              <LuMapPin size="17" />
              <div className="text-secondary  truncate-2-line">
                {event.address}
              </div>
            </div>
          </div>
          <div className="flex items-center border-t border-gray-300 justify-between pt-4 pb-2 mt-2">
            <span>1000vnd</span>
            <div className="border border-gray-300 rounded-full hover:scale-125 transition-all duration-200">
              <div className="p-1">
                <LuHeart size="20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;

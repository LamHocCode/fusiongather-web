"use client";

import { useEffect, useState } from 'react';
import Calendar from "@/components/main/Calendar";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import BoxTicket from "./BoxTicket";
import EventInfo from "./EventInfo";
import { followEvent, countFollower, checkIsFollowed, unFollowEvent } from "@/lib/actions/event";
import { EventType } from "@/lib/type";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface Props {
    event: EventType,
}

const LeftContent = ({ event }: Props) => {
    const [followerCount, setFollowerCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const count = await countFollower(event.id);
                setFollowerCount(count);
                const isFollowed = await checkIsFollowed(event.id);
                setIsFollowed(isFollowed);
                const owner = await checkIsFollowed(event.author.id);
                setIsOwner(owner);
                console.log(isOwner);
            } catch (error) {
                console.error("Error fetching follower count:", error);
            }
        };

        fetchData();
    }, [event.id]);

    const handleFollowEvent = async () => {
        try {
            if (isFollowed) {
                await unFollowEvent(event.id);
                setIsFollowed(false);
            } else {
                await followEvent(event.id);
                setIsFollowed(true);
            }
            const newFollowerCount = await countFollower(event.id);
            setFollowerCount(newFollowerCount);
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };
    console.log(isOwner);
    return (
        <>
            <div className="w-full flex items-start gap-8">
                <Calendar event={event} />
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        {event.title}
                    </h3>
                    <EventInfo event={event} />
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[64px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400" onClick={handleFollowEvent}>
                        {isFollowed ? <FaHeart /> : <FaRegHeart />}
                        <span className="text-secondary text-sm">{followerCount}</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary"></div>
                </div>
                {isOwner ?
                    <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={() => router.push(`/event/request/${event.id}`)} >
                        <IoShareSocialOutline />
                        <span className="text-secondary text-sm">View request</span>
                    </div> :
                    <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" >
                        <IoShareSocialOutline />
                        <span className="text-secondary text-sm">View QRCode</span>
                    </div>
                }
            </div>
            <div>
                <span dangerouslySetInnerHTML={{ __html: event.description }} suppressHydrationWarning></span>
            </div>
            <BoxTicket />
        </>
    );
}

export default LeftContent;

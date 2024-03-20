"use client"

import { formatTime } from "@/lib/Format";
import { EventType, ImageType } from "@/lib/type";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { PublishFormSchema } from "@/lib/validatior";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { getImagesByEventId } from "@/lib/actions/image";

const PendingEventBox = ({ data }: { data: EventType }) => {
    const [eventImage, setEventImage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const image = await getImagesByEventId(data.id);
                setEventImage(image[0]?.url);
            } catch (error) {
                console.error("Error fetching follower count:", error);
            }
        };

        fetchData();
    }
        , [data.id]);
        
    const form = useForm<z.infer<typeof PublishFormSchema>>({
        resolver: zodResolver(PublishFormSchema),
        defaultValues: {
            publish: false,
        },
    })
    const onSubmit = async (data: z.infer<typeof PublishFormSchema>) => {

    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="xl:w-full w-full md:w-[600px] max-xl:mx-auto space-y-6">
                    <div className="flex w-full p-4 border rounded-xl">
                        <div className="w-[42%] pr-6">
                            <div className="overflow-hidden  rounded-xl relative aspect-[2/1] mb-4">
                                <Image
                                    src={eventImage}
                                    alt={`event-image`}
                                    fill
                                    className="w-full h-full object-fill z-20"
                                />
                            </div>
                        </div>
                        <div className="w-[58%] pl-6 border-l ">
                            <div className="flex flex-col gap-5 border-b pb-5">
                                <div className="font-bold truncate-2-line">
                                    {data.title}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span><FaRegCalendarAlt size={20} /></span>
                                    <span className="text-xs">
                                        {formatTime(data.startDateTime)} - {formatTime(data.endDateTime)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>
                                        <GoLocation size={20} />
                                    </span>
                                    <span className="text-xs">
                                        {data.location}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 pt-5 px-4 text-black">
                                {/* <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                                            <LuPenLine size={24} />
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-24">
                                        <div className="text-center">
                                            Edit
                                        </div>
                                    </HoverCardContent>
                                </HoverCard> */}
                                <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                                    <IoShareSocialOutline size={24} />
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                                            <BsThreeDotsVertical size={24} />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40">
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem>
                                                Billing
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem>
                                                Settings
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                </form >
            </Form >

        </>
    );
}

export default PendingEventBox;
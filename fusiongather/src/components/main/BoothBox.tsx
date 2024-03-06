"use client"

import { formatTime } from "@/lib/Format";
import { BoothType, EventType } from "@/lib/type";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { LuPartyPopper, LuPenLine } from "react-icons/lu";
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
import Link from "next/link";

const BoothBox = ({ data }: { data: BoothType }) => {
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
                                    src={'/test-booth.jpg'}
                                    alt={`booth-image`}
                                    fill
                                    className="w-full h-full object-fill z-20"
                                />
                            </div>

                        </div>
                        <div className="w-[58%] pl-6 border-l ">
                            <div className="flex flex-col gap-5 border-b pb-5">
                                <div className="font-bold truncate-2-line">
                                <Link href={`/event/booth/${data.id}`}>
                                        {data.name}
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span><LuPartyPopper size={20} /></span>
                                    <span className="text-xs">
                                        {data.eventId.title} 
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span>
                                        <IoIosPerson size={20} />
                                    </span>
                                    <span className="text-xs">
                                        {data.vendorId.firstName} {data.vendorId.lastName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </form >
            </Form >

        </>
    );
}

export default BoothBox;
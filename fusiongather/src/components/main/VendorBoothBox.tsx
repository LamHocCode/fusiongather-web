"use client"

import { formatTime } from "@/lib/Format";
import { BoothType, EventType, ImageType } from "@/lib/type";
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
    FormMessage,
} from "@/components/ui/form"
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { deleteBooth, registerBooth } from "@/lib/actions/booth";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from "@nextui-org/react";
import { on } from "events";
import { set, z } from "zod";
import { getImagesByBoothId } from "@/lib/actions/image";
import { checkIsRequested } from "@/lib/actions/booth";
import { Label } from "@radix-ui/react-dropdown-menu";
import { boothFormSchema, registerFormSchema } from "@/lib/validatior";
import { useForm } from "react-hook-form";
import { TfiPencilAlt } from "react-icons/tfi";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const VendorBoothBox = ({ data }: { data: BoothType }) => {
    const [boothImage, setBoothImage] = useState<string>("");
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const image = await getImagesByBoothId(data.id);
                setBoothImage(image[0]?.url);

            } catch (error) {
                console.error("Error fetching follower count:", error);

            }
        };
        fetchData();

    }
        , [data.id, registerSuccess]);



    return (
        <>

            <div className="flex w-full p-4 border rounded-xl">
                <ToastContainer />
                <div className="w-[42%] pr-6">
                    <div className="overflow-hidden  rounded-xl relative aspect-[2/1] mb-4">
                        <Image
                            src={boothImage ? boothImage : "/no-image.png"}
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
                        <Link href={`/event/${data.eventId.id}`}>
                            <div className="flex items-center gap-4">
                                <span><LuPartyPopper size={20} /></span>
                                <span className="text-xs">
                                    {data.eventId.title}
                                </span>
                            </div>
                        </Link>
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
        </>
    );
}

export default VendorBoothBox;
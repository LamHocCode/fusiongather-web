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
} from "@/components/ui/form"
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { deleteBooth } from "@/lib/actions/booth";
import { Modal, ModalBody, ModalContent, ModalFooter } from "@nextui-org/react";
import { on } from "events";
import { set } from "zod";
import { getImagesByBoothId } from "@/lib/actions/image";
import { checkIsRequested } from "@/lib/actions/booth";

const BoothBox = ({ data }: { data: BoothType }) => {
    const [showModal, setShowModal] = useState(false);
    const [isDelete, setIsDelete] = useState(0);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [boothImage, setBoothImage] = useState<string>("");
    const [isRequested, setIsRequested] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        setDeleteItemId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId !== null) {
            await deleteBooth(deleteItemId)
            setShowModal(false);
            setIsDelete(isDelete + 1)
            window.location.reload();
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const image = await getImagesByBoothId(data.id);
                setBoothImage(image[0]?.url);
                const isRequest = await checkIsRequested(data.id);
                setIsRequested(isRequest);
            } catch (error) {
                console.error("Error fetching follower count:", error);
            }
        };

        fetchData();
    }
        , [data.id]);
        
    return (
        <>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Confirm Delete"
            >
                <ModalContent>
                    <ModalBody>Are you sure you want to delete this booth?</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setShowModal(false)} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="danger"
                            variant={"ghost"}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="flex w-full p-4 border rounded-xl">
                <div className="w-[42%] pr-6">
                    <div className="overflow-hidden  rounded-xl relative aspect-[2/1] mb-4">
                        <Image
                            src={boothImage}
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
                    <div className="flex items-center justify-between gap-4 pt-5 px-4 text-black">
                        { !isRequested ? <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="cursor-pointer hover:bg-secondary p-2 rounded-full" >
                                    <LuPenLine size={24} />
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-24">
                                <div className="text-center">
                                    Register
                                </div>
                            </HoverCardContent>
                        </HoverCard> : <div className="cursor-pointer hover:bg-secondary p-2 rounded-full" > You already registed this booth </div>}
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                                    <FaTrashAlt size={24} onClick={() => handleDelete(data.id)} />
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-24">
                                <div className="text-center">
                                    Delete
                                </div>
                            </HoverCardContent>
                        </HoverCard>

                        <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default BoothBox;
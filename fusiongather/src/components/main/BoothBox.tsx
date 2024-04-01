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
import { checkIsEventOwner } from "@/lib/actions/event";

const BoothBox = ({ data, isOwner }: { data: BoothType, isOwner: boolean }) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [boothImage, setBoothImage] = useState<string>("");
    const [isRequested, setIsRequested] = useState<boolean>(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [reason, setReason] = useState("");
    const [reasonIsEmpty, setReasonIsEmpty] = useState(false);

    const form = useForm<z.infer<typeof registerFormSchema>>({
        defaultValues: {
            userId: data.vendorId.id,
            boothId: data.id,
            reason: "",
        },
    });

    const showToastMessage = (type: number) => {
        if (type === 1) {
            toast('Register booth successfully!', {
                position: "top-right",
                closeOnClick: true,
                draggable: false,
                type: "success",
                toastId: 13
            })
        } else toast('Delete booth successfully!', {
            position: "top-right",
            closeOnClick: true,
            draggable: false,
            type: "success",
            toastId: 13
        })
    };

    const handleDelete = (id: number) => {
        setDeleteItemId(id);
        setShowModal(true);
    };

    const handleRegisterClick = () => {
        setShowRegisterModal(true);
    };

    const handleRegisterConfirm = async () => {
        try {
            const registrationData = { userId: data.vendorId.id, boothId: data.id, reason };
            await registerBooth(registrationData);
            setRegisterSuccess(true);
            setShowConfirmModal(false);
            setShowRegisterModal(false);

        } catch (error) {
            console.error("Error registering booth:", error);
        }
        showToastMessage(1);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId !== null) {
            await deleteBooth(deleteItemId)
            setShowModal(false);
            showToastMessage(2);
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
        , [data.id, registerSuccess]);

    const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
        setReason(data.reason);
        if (data.reason === "") {
            setReasonIsEmpty(true);
            return;
        } else
            setShowConfirmModal(true)

    };
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

            <Modal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                title="Register Booth"
                placement="top-center"
                className="w-full max-w-3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <Form {...form}>
                                <ModalHeader className="flex flex-col gap-1">Register this booth ?</ModalHeader>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <ModalBody>
                                        <div className="lg:grid-cols-2">
                                            <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl">
                                                <div className="flex gap-2 items-center text-secondary">
                                                    <TfiPencilAlt />
                                                    <span>Reason</span>
                                                </div>
                                                {reasonIsEmpty && <div className="text-red-500">Reason is required</div>

                                                }
                                                <div className="flex flex-col gap-5 h-full ">
                                                    <FormField
                                                        control={form.control}
                                                        name="reason"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full">
                                                                <FormControl>
                                                                    <Textarea
                                                                        value={field.value.toString()} // Convert the value to a string
                                                                        onChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button color="danger" onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Register
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Form>
                        </>
                    )}
                </ModalContent>

            </Modal>

            <Modal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Registration"
            >
                <ModalContent>
                    <ModalBody>
                        Are you sure you want to register this booth?
                    </ModalBody>
                    <ModalFooter>

                        <Button color="danger" variant={"ghost"} onClick={() => setShowConfirmModal(false)}>
                            Cancel
                        </Button>
                        <Button color="danger"
                            variant={"ghost"} onClick={handleRegisterConfirm}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


            <div className="flex w-full p-4 border rounded-xl">
                <ToastContainer />
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

                    {!data.eventId.isPublished ?
                        <div className="flex items-center justify-between gap-4 pt-5 px-4 text-black">

                            {!isRequested ? <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div className="cursor-pointer hover:bg-secondary p-2 rounded-full" onClick={handleRegisterClick}>
                                        <LuPenLine size={24} />
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-24">
                                    <div className="text-center">
                                        Register
                                    </div>
                                </HoverCardContent>
                            </HoverCard> : <div className="cursor-pointer hover:bg-secondary p-2 rounded-full" > You already registed this booth </div>}

                            {isOwner && (
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
                            )}

                            <div className="cursor-pointer hover:bg-secondary p-2 rounded-full">
                            </div>

                        </div> : null
                    }
                </div>
            </div>
        </>
    );
}

export default BoothBox;
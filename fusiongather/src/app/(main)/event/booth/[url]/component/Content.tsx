"use client"

import Calendar from "@/components/main/Calendar";
import { FaLocationDot, FaRegHeart } from "react-icons/fa6";
import { FaPencilAlt, FaRegCalendarAlt } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import BoothInfo from "./BoothInfo";
import { BoothType } from '@/lib/type';
import { z } from "zod";
import { isBoothAuthor, updateBooth } from "@/lib/actions/booth";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Switch } from "@nextui-org/react";
import LocationModal from "@/components/shared/LocationModal";
import { boothFormSchema } from "@/lib/validatior";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuillText from "@/components/shared/QuillText";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import DropDown from "@/components/shared/DropDown";
import { UploadDropzone } from "@uploadthing/react";
import { DatePicker } from "antd";
import form from "antd/es/form";
import { BiCategory } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import { useState } from "react";
import Router from "next/router";
import { TbFileDescription } from "react-icons/tb";
import { error } from "console";
import { off } from "process";
import { useRouter } from "next/navigation";

const Content = ({ booth }: { booth: BoothType }) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isMapOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();
    const initialValues = {
        name: booth.name,
        description: booth.description,
        latitude: Number(booth.latitude),
        longitude: Number(booth.longitude),
    };

    const form = useForm<z.infer<typeof boothFormSchema>>({
        defaultValues: initialValues,
    });

    const handleUpdateNavigate = () => {
        router.push(`/event/booth/update/${booth.id}`);
    }

    const currentCoords = [form.getValues("longitude"), form.getValues("latitude")];

    const onSubmit: SubmitHandler<z.infer<typeof boothFormSchema>> = async (data) => {
        try {
            await updateBooth(booth.id, data);
            onClose();
            window.location.reload();
        } catch (error) {
            throw new Error("Something went wrong!");
        }
    };

    function setLocation(location: string, longitude: number, latitude: number) {
        form.setValue("longitude", longitude);
        form.setValue("latitude", latitude);
    }

    return (
        <>
            <LocationModal
                isOpen={isMapOpen}
                onClose={() => setIsOpen(false)}
                setLocation={setLocation}
                currentCoords={currentCoords}
            />
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                className="w-full max-w-3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <Form {...form}>
                                <ModalHeader className="flex flex-col gap-1">Update information</ModalHeader>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <ModalBody>
                                        <div className="lg:grid-cols-2">
                                            <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl">
                                                <div className="flex gap-2 items-center text-secondary">
                                                    <TfiPencilAlt />
                                                    <span>Name</span>
                                                </div>
                                                <div className="flex flex-col gap-5 h-full ">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full">
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Event title"
                                                                        {...field}
                                                                        className="h-14 text-[18px] text-secondary rounded-2xl"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="flex gap-2 items-center text-secondary">
                                                        <TbFileDescription />
                                                        <span>Description</span>
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="description"
                                                        render={({ field }) => (
                                                            <FormItem className="w-full h-full">
                                                                <FormControl>
                                                                    <QuillText
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center text-secondary">
                                                    <FaLocationDot />
                                                    <span>Location</span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => setIsOpen(true)}
                                                    className="w-full h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-2xl hover:bg-primary/20"
                                                >
                                                    Choose
                                                </Button>
                                            </div>

                                        </div>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary" onPress={onClose}>
                                            Update
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </Form>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="w-full flex items-start gap-8">
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        {booth.name}
                    </h3>
                    <BoothInfo booth={booth} />
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[64px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400">
                        <FaRegHeart />
                        <span className="text-secondary text-sm">QR Code</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary"></div>
                </div>

                <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={handleUpdateNavigate}>
                    <FaPencilAlt />

                    <span className="text-secondary text-sm">Edit </span>

                </div>

            </div>
            <span dangerouslySetInnerHTML={{ __html: booth?.description }} suppressHydrationWarning></span>
        </>
    );
}

export default Content;
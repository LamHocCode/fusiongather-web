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

const Content = ({ booth, isOwner }: { booth: BoothType, isOwner: boolean }) => {
    const router = useRouter();

    const handleUpdateNavigate = () => {
        router.push(`/event/booth/update/${booth.id}`);
    }
    console.log(isOwner);
    return (
        <>
            
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
{isOwner ?
                <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400" onClick={handleUpdateNavigate}>
                    <FaPencilAlt />

                    <span className="text-secondary text-sm">Edit </span>

                </div> : null
}
            </div>
            <span dangerouslySetInnerHTML={{ __html: booth?.description }} suppressHydrationWarning></span>
        </>
    );
}

export default Content;
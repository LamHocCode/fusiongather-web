"use client"

import Calendar from "@/components/main/Calendar";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import BoothInfo from "./BoothInfo";
import { BoothType } from '@/lib/type';
import Link from "next/link";

const Content = ({ booth }: { booth: BoothType }) => {

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

                <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400">
                    <IoShareSocialOutline />
                    <Link href={"/"}>
                        <span className="text-secondary text-sm">Edit </span>
                    </Link>
                </div>

            </div>
            <span dangerouslySetInnerHTML={{ __html: booth?.description }} suppressHydrationWarning></span>
        </>
    );
}

export default Content;
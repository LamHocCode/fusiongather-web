"use client"

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect } from "react";

const UserInfo = () => {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <div className="md:flex hidden items-center gap-3 py-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-sm w-fit inline-block text-gray-700 hover:text-[#FF8E3C] transition-all duration-400 uppercase">
                    {`${session?.user?.firstName} ${session?.user?.lastName}`}
                </div>
            </div>
        )
    }

    return (
        <Link href={'/login'}
            className="flex gap-2 items-center border border-solid border-[#5B5B5B] rounded-full px-4 py-2.5 text-primary font-semibold hover:bg-[#FF8E3C]  hover:bg-opacity-20 cursor-pointer">
            <FiUser />
            <span className="hidden md:block">Sign In</span>
        </Link>
    );
}

export default UserInfo;
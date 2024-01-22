"use client"

import Search from "../main/search/Search";
import Logo from "../main/Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserInfo from "../main/UserInfo";

const Header = () => {
    const { status } = useSession();

    return (
        <div className={`flex items-center ${status === "authenticated" ? "sm:pl-[100px] sm:pr-[40px]  justify-center sm:justify-between" : "lg:pl-[67px] md:pl-[40px] lg:pr-[67px] md:pr-[40px] justify-between"} px-4 py-2.5 fixed z-30 top-0 left-0 right-0 w-full bg-white  shadow-md`}>
            <div className="flex items-center gap-6">
                <div className="flex flex-col lg:flex-row lg:items-end items-center lg:gap-4 gap-1">
                    <Link href={'/'}>
                        <Logo size="medium" />
                    </Link>
                    <span className="text-secondary text-xs ">
                        The live platform for contents worth sharing
                    </span>
                </div>
                <Search />
            </div>
            <UserInfo />
        </div>
    );
}

export default Header;
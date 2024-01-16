"use client"

import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from "../../hook/useSidebar";
import LeftSidebarItem from "./LeftSidebarItem";
import { LeftSidebarLinks } from "@/contants";

const LeftSidebar = () => {
    const { isOpen, handleOpenSidebar } = useSidebar()

    return (
        <>
            <div className={`fixed z-30 top-0 left-0 bottom-0 ${isOpen ? "min-w-[240px]" : "min-w-[67px]"} transition-all duration-500 pt-20 border-r border-gray-200 bg-white`}>
                <nav className="flex flex-col pb-2 justify-betwwen">
                    <ul role="list" className="flex flex-col">
                        {LeftSidebarLinks.top.map((link) => {
                            return (
                                <LeftSidebarItem item={link} key={link.label} />
                            )
                        })}
                    </ul>
                </nav>
                <hr />
                <nav className="flex flex-col pt-2 justify-betwwen">
                    <ul role="list" className="flex flex-col">
                        {LeftSidebarLinks.bottom.map((link) => {
                            return (
                                <LeftSidebarItem item={link} key={link.label} />
                            )
                        })}
                    </ul>
                </nav>
            </div >
            <div
                onClick={handleOpenSidebar}
                className="fixed top-6 left-6 z-50 cursor-pointer hover:text-gray-500">
                <AiOutlineMenu size="22" />
            </div>
        </>
    );
}

export default LeftSidebar;
"use client"

import { useSidebar } from "@/hook/useSidebar"
import { useSession } from "next-auth/react"

export default function Container({ children }: { children: React.ReactNode }) {
    const { isOpen } = useSidebar()
    const { status } = useSession()
    return (
        <div className={`${status === "authenticated" ? isOpen ? "md:ml-[270px] md:mr-[30px] mx-5" : "ml-[67px] px-4 sm:px-8 lg:px-10" : "lg:px-20 px-4 md:px-12 sm:px-6"} transition-all duration-500`}>
            <div className={`max-w-[1440px] mx-auto`}>
                {children}
            </div>
        </div>
    )
}
import { useSidebar } from "@/hook/useSidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface Props {
    item: {
        label: string,
        href: string,
        icon: any,
        onClick?: () => void
    }
}


const LeftSidebarItem = ({ item }: Props) => {
    const { isOpen } = useSidebar()
    const pathname = usePathname()
    const handleClick = () => {
        if (item.onClick) {
            return item.onClick()
        }
    }
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const active = (pathname?.includes(item.href) && item.href.length > 1) || pathname === item.href;
    return (
        <li onClick={handleClick} className="relative">
            <Link href={item.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group pl-5 rounded-r-full flex py-4 gap-6 text-sm leading-6 font-semibold hover:text-[#FF8E3C] hover:bg-[#FF8E3C]/10 transition-colors ${active && 'bg-[#FF8E3C]/10 text-primary'}`}
            >
                <div className={`w-1 h-full absolute left-0 top-0 transition-colors ${isHovered && 'bg-primary'}`}></div>
                <item.icon className="h-6 w-6 shrink-0" />
                <span className={`w-fit inline-block font-thin absolute left-16 ${!isOpen ? "sr-only" : "animate-slide-in"}`}>{item.label}</span>
            </Link>
        </li>
    );
}

export default LeftSidebarItem;
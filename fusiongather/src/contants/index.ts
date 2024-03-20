import { GoHome } from "react-icons/go";
import { LuTicket } from "react-icons/lu";
import { PiNotepad, } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { LogOut } from "@/lib/actions/logout";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";


export const LeftSidebarLinks = {
    top: [
        {
            label: 'Create Events',
            href: '/event',
            icon: FiPlusCircle,
        },
        {
            label: 'Home',
            href: '/',
            icon: GoHome,
        },
        {
            label: 'Pending Events',
            href: '/event/pending',
            icon: MdOutlinePendingActions,
        },
        {
            label: 'My Ticket',
            href: '/my-ticket',
            icon: LuTicket,
        },
        {
            label: 'My Order',
            href: '/my-order',
            icon: PiNotepad,
        },
        {
            label: 'Profile',
            href: '/profile',
            icon: LuUser2,
        }],
    bottom: [
        {
            label: 'Corporate',
            href: '/corporate',
            icon: TbBuildingWarehouse
        },
        {
            label: 'Logout',
            onClick: () => LogOut(),
            href: '#',
            icon: FiLogOut
        }
    ]
};

export const ListEvent = [{
    title: "Da Nang's FRIDAY SOCIALS meetups for nomads, founders, mentors, angels, VCs",
    src: "https://utfs.io/f/89bf1c41-11f2-44ee-9da0-a634a8ed9d6f-lcto2x.jpg",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội"
},
{
    title: "Monday we paint: The Innovation Blue Print",
    src: "https://utfs.io/f/3f07ed11-ebfa-4f64-a62e-7de2845a5e1a-lcto2w.jpg",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "The RECESS CRUISE on Labor Day Weekend 2024!",
    src: "https://utfs.io/f/fe425d10-24ce-47aa-8229-fed311fbf927-lcto2v.jpg",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Powerful Women Rising - Virtual Speed Networking Event",
    src: "https://utfs.io/f/a7f4eee1-f16e-4c84-a6c7-b6908a971451-lcto2u.jpg",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "2024 Virtual Endometriosis Conference | 11th Annual Worldwide EndoMarch",
    src: "https://utfs.io/f/de18d0d8-43a1-40a1-acbd-23fdb0ba5987-mrj8sc.jpg",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4, Le Chauffage Concert No.4 Le Chauffage Concert No.4,Le Chauffage Concert No.4",
    producer: "Boom Lee",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
}]



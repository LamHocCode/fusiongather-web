import { GoHome } from "react-icons/go";
import { LuTicket } from "react-icons/lu";
import { PiNotepad, } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { LogOut } from "@/lib/actions/logout";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";


export const LeftSidebarLinks = {
    top: [
        {
            label: 'Create Events',
            href: '/event/create',
            icon: FiPlusCircle,
        },
        {
            label: 'Home',
            href: '/',
            icon: GoHome,
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
    title: "Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội,Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4, Le Chauffage Concert No.4 Le Chauffage Concert No.4,Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4, Le Chauffage Concert No.4 Le Chauffage Concert No.4,Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
},
{
    title: "Le Chauffage Concert No.4, Le Chauffage Concert No.4 Le Chauffage Concert No.4,Le Chauffage Concert No.4",
    producer: "Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage, Từ Hòa Nhạc Sưởi Ấm - Le Chauffage",
    time: "17:00 - 19:00",
    date: "Sunday,14 Th01, 2024",
    price: "200,000đ",
    address: "Nhà hát lớn Hà Nội"
}]



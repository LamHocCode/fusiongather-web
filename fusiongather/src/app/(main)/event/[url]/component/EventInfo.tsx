import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { RiMapPin2Line } from "react-icons/ri";


const EventInfo = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
                <FaRegUserCircle size="24" />
                <Link href={'/'}>
                    <span className="text-lg truncate">British Chamber Of Commerce Vietnam</span>
                </Link>
            </div>
            <div className="flex items-center gap-6">
                <LiaCalendarWeekSolid size="24" />
                <div className="text-gray-600 text-sm leading-6">
                    <div >
                        05:30, Chủ Nhật, 17 Th03, 2024
                    </div>
                    <div>
                        10:00, Chủ Nhật, 17 Th03, 2024
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <RiMapPin2Line size="24" />
                <span className="text-secondary text-sm truncate-2-line">
                    SALA City, Thu Thiem New Urban Area – Ho Chi Minh City
                </span>
            </div>
        </div>
    );
}

export default EventInfo;
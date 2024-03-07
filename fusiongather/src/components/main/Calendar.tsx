import { format, formatToDay, formatToWeek } from "@/lib/Format";
import { EventType } from "@/lib/type";



const Calendar = (data: any) => {
    return (
        <div className="border text-center shadow-xl min-w-[127px]">
            <div className="py-1 text-sm bg-primary text-white">{format(data.event.startDateTime)}</div>
            <div className="border-t border-b text-[38px] py-4">{formatToDay(data.event.startDateTime)}</div>
            <div className="py-1 text-sm text-secondary">{formatToWeek(data.event.startDateTime)}</div>
        </div>
    );
}

export default Calendar;
import { format, formatToDay, formatToWeek } from "@/lib/Format";

const Calendar = () => {
    return (
        <div className="border text-center shadow-xl min-w-[127px]">
            <div className="py-1 text-sm bg-primary text-white">{format("2024-01-14T09:45:27.639Z")}</div>
            <div className="border-t border-b text-[38px] py-4">{formatToDay("2024-01-14T09:45:27.639Z")}</div>
            <div className="py-1 text-sm text-secondary">{formatToWeek("2024-01-14T09:45:27.639Z")}</div>
        </div>
    );
}

export default Calendar;
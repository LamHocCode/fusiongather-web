import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
const EventPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    select search event here
                </div>
                <Link href={'/event/create'}>
                    <Button type="button" className="min-w-[200px] h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-full hover:bg-primary/20">
                        <FiPlusCircle className="mr-4" />
                        Create Event
                    </Button>
                </Link>
            </div>
            <div className="text-secondary mt-4">
                <div className="w-full text-center text-xl">No data</div>
            </div>
        </div>
    );
}

export default EventPage;
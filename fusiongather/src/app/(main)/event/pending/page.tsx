import PendingEvents from "@/components/main/PendingEvent";
import { Button } from "@/components/ui/button";
import { getPendingEvents } from "@/lib/actions/event";
import Link from "next/link";
import { FaRegListAlt } from "react-icons/fa";

const PendingEventPage = async () => {
    const events = await getPendingEvents()

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    Pending Events
                </div>
                <Link href={'/event/pending/mybooth'}>
                    <Button type="button" className="min-w-[200px] h-14 text-lg text-primary bg-white border border-[#FF8E3C] rounded-full hover:bg-primary/20">
                        <FaRegListAlt className="mr-4" />
                        My Booths
                    </Button>
                </Link>
            </div>

            <div className="text-secondary mt-4">
                {events && events.length > 0 ?
                    <PendingEvents events={events} />
                    :
                    <div className="w-full text-center text-xl">There is not event is pending</div>
                }
            </div>
        </div>
    );
}

export default PendingEventPage;
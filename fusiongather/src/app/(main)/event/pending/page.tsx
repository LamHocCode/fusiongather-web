import PendingEvents from "@/components/main/PendingEvent";
import { Button } from "@/components/ui/button";
import { getAllEvent } from "@/lib/actions/event";
import { getPendingEvents } from "@/lib/actions/event";
import getSession from "@/lib/actions/getSession";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

const PendingEventPage = async () => {
    const events = await getPendingEvents()

    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    Pending Events
                </div>
            </div>
            <div className="text-secondary mt-4">
                {events && events.length > 0 ?
                    <PendingEvents events={events} />
                    :
                    <div className="w-full text-center text-xl">No data</div>
                }
            </div>
        </div>
    );
}

export default PendingEventPage;
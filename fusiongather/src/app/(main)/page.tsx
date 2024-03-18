import Banner from "@/components/layout/Banner";
import EventItem from "@/components/main/EventItem";
import { ListEvent } from "@/contants";
import { getLatestEvent } from "@/lib/actions/event";
import { EventType } from "@/lib/type";

export default async function Home() {
  var events:EventType[] = await getLatestEvent();
  return (
    <main className="flex-1 mt-24">
      <Banner events={events}/>
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {ListEvent.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </div >
    </main>
  )
}

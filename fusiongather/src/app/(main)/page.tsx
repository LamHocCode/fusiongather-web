import Banner from "@/components/layout/Banner";
import EventItem from "@/components/main/EventItem";
import { ListEvent } from "@/contants";
import { getAllEvent, getLatestEvent } from "@/lib/actions/event";
import { getImagesByEventId } from "@/lib/actions/image";
import { EventType, ImageType } from "@/lib/type";
import { GetAllEventType } from "@/lib/type";

export default async function Home() {
  var latestEvents:EventType[] = await getLatestEvent();
  const pageNumber:GetAllEventType = 1 as GetAllEventType;
  const publisedEvent:EventType[] = await getAllEvent(pageNumber);
  const imgSrc: ImageType[] = await Promise.all(latestEvents.map(event => getImagesByEventId(event.id)));
  return (
    <main className="flex-1 mt-24">
      <Banner events={latestEvents} imageSrc={imgSrc}/>
      <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {publisedEvent.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </div >
    </main>
  )
}
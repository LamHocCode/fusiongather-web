import EventItem from "@/components/main/EventItem";
import { EventForm } from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event";
import EventInfo from "../../[url]/component/EventInfo";
import EventManage from "@/components/shared/EventManage";
import LeftContent from "../../[url]/component/LeftContent";
import RightContent from "../../[url]/component/RightContent";

type UpdateEventProps = {
  params: {
    id: number;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const event = await getEventById(id);
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <EventForm type = "Update" event={event} eventId={Number(event.id)} />
      </section>
    </>
  );
};

export default UpdateEvent;

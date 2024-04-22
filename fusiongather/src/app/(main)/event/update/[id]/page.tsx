import EventItem from "@/components/main/EventItem";
import { EventForm } from "@/components/shared/EventForm";
import NotFoundPage from "@/components/shared/NotFoundPage";
import UnauthorizedPage from "@/components/shared/UnauthorizedPage";
import { checkIsEventOwner, getEventById } from "@/lib/actions/event";

type UpdateEventProps = {
  params: {
    id: number;
  };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const event = await getEventById(id);
  if (event?.message) {
    return <NotFoundPage />;
  }
  const isEventOwner = await checkIsEventOwner(event.author.id);
  if (!isEventOwner) {
    return <UnauthorizedPage />;
  }
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <EventForm type = "Update" event={event} eventId={Number(event.id)} />
      </section>
    </>
  );
};

export default UpdateEvent;

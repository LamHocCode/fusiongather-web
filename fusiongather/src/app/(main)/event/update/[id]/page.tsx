import { EventForm } from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event";
import EventInfo from "../../[url]/component/EventInfo";

type UpdateEventProps = {
  params: {
    id: number;
  };

};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const data = await getEventById(id);
  
  return (
    <>
      <section className="bg-gray-100 sm:px-8 px-2 py-4">
        <EventInfo data={data} eventId={Number(data.id)} />
      </section>
    </>
  );
};

export default UpdateEvent;

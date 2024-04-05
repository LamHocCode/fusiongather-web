import CheckoutButton from "@/components/shared/CheckoutButton";
import { EventType } from "@/lib/type";
import { IoIosArrowForward } from "react-icons/io";

interface Props {
  event: EventType;
}

const Ticket = ({ isHidden, data }: { isHidden: boolean; data: Props }) => {
  return (
    <>
      {!isHidden && (
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-start justify-between">
            {!data?.event?.isFree ? (
              <>
                <span className="text-secondary text-sm">Early Bird | Kid</span>
                <div className="flex items-center gap-8">
                  <span className="text-sm font-semibold">
                    {data?.event?.price}
                  </span>
                  <IoIosArrowForward />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-8">
                <span className="text-lg font-semibold">Free</span>
                <IoIosArrowForward />
              </div>
            )}
          </div>
        </div>
      )}
      
      <button
        type="button"
        className="lg:p-4 py-2 px-4 rounded-full bg-primary text-white text-sm  border hover:bg-white hover:border-[#FF8E3C] hover:text-[#FF8E3C] w-full"
      >
        <CheckoutButton event={data?.event} />
      </button>
    </>
  );
};

export default Ticket;

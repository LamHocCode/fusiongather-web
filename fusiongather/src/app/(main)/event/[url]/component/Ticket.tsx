import { EventType } from "@/lib/type";
import { IoIosArrowForward } from "react-icons/io";

const Ticket = ({ isHidden, data }: { isHidden: boolean; data: EventType }) => {
  return (
    <>
      {!isHidden && (
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-start justify-between">
            {!data.isFree ? (
              <>
                <span className="text-secondary text-sm">Early Bird | Kid</span>
                <div className="flex items-center gap-8">
                  <span className="text-sm font-semibold">{data.price}</span>
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
        className="p-4 rounded-full bg-primary text-white text-sm w-full border hover:bg-white hover:border-[#FF8E3C] hover:text-[#FF8E3C]"
      >
        Register Tikets
      </button>
    </>
  );
};

export default Ticket;
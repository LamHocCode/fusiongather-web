import { IoIosArrowForward } from "react-icons/io";

const Ticket = ({ isHidden }: { isHidden: boolean }) => {
    return (

        <>
            {!isHidden &&
                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-start justify-between">
                        <span className="text-secondary text-sm">
                            Early Bird | Kid
                        </span>
                        <div className="flex items-center gap-8">
                            <span className="text-sm font-semibold">
                                170,000đ
                            </span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <span className="text-secondary text-sm">
                            Standard Price | Kids
                        </span>
                        <div className="flex items-center gap-8">
                            <span className="text-sm font-semibold">
                                170,000đ
                            </span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <span className="text-secondary text-sm">
                            Early Bird | Adult
                        </span>
                        <div className="flex items-center gap-8">
                            <span className="text-sm font-semibold">
                                170,000đ
                            </span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                    <div className="flex items-start justify-between">
                        <span className="text-secondary text-sm">
                            Standard Price | Adult
                        </span>
                        <div className="flex items-center gap-8">
                            <span className="text-sm font-semibold">
                                170,000đ
                            </span>
                            <IoIosArrowForward />
                        </div>
                    </div>
                </div>
            }

            <button type="button" className="p-4 rounded-full bg-primary text-white text-sm w-full border hover:bg-white hover:border-[#FF8E3C] hover:text-[#FF8E3C]">
                Register Tikets
            </button>
        </>
    );
}

export default Ticket;
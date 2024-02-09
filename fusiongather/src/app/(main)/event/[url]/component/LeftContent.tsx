import Calendar from "@/components/main/Calendar";
import { FaRegHeart } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import BoxTicket from "./BoxTicket";
import EventInfo from "./EventInfo";

const LeftContent = () => {
    return (
        <>
            <div className="w-full flex items-start gap-8">
                <Calendar />
                <div className="flex-1">
                    <h3 className="text-3xl uppercase text-gray-600 leading-normal mb-6">
                        UAN X YEAR END PARTY - MARKETING TRENDS 2024 & BEYOND
                    </h3>
                    <EventInfo />
                </div>
            </div>
            <div className="w-full border rounded-full flex my-8 h-[64px] cursor-pointer">
                <div className="flex items-center justify-center w-1/2 h-full ">
                    <div className="flex rounded-full h-full hover:bg-gray-100 items-center gap-2 w-full justify-center transition-all duration-400">
                        <FaRegHeart />
                        <span className="text-secondary text-sm">4</span>
                    </div>
                    <div className="w-[1px] h-10 bg-secondary"></div>
                </div>

                <div className="flex items-center justify-center gap-2 w-1/2 rounded-full hover:bg-gray-100 transition-all duration-400">
                    <IoShareSocialOutline />
                    <span className="text-secondary text-sm">Share event</span>
                </div>
            </div>
            <div>
                Để khởi động một năm mới đầy hứa hẹn với nhiều nguồn cảm hứng và tràn đầy năng lượng, Vietnam Airlines x SpaceSpeakers Group phối hợp cùng Vietcetera tổ chức sự kiện âm nhạc đón bình minh chưa từng có ở Việt Nam.



                Đúng như tên gọi của sự kiện, 5AM sẽ là nơi quy tụ của "hội chim sớm", sẵn sàng thức dậy để cùng nhau để tận hưởng sự kỳ diệu của những khoảnh khắc đầu ngày, thông qua các hoạt động thể thao và âm nhạc kết nối người tham dự như:



                🏃‍♂️ Fun Run

                🧘‍♀️ Rise and Shine Yoga

                🎶 Live Performance



                *Lưu ý: Đối với hoạt động thể thao Fun Run hoặc Yoga, số lượng người tham dự giới hạn dành cho 100 khách mua vé đăng ký sớm nhất. (Cập nhật: số lượng đăng ký cho mỗi hoạt động đã đủ số lượng.)



                Tham gia ngay sự kiện 5AM để thưởng thức những màn trình diễn đến từ các nghệ sĩ hàng đầu Việt Nam với những ca khúc hot hit.



                Hãy trở thành một phần của #5AMCLUB, cùng dậy sớm đón bình minh và chào ngày mới!
            </div>
            <BoxTicket />
        </>
    );
}

export default LeftContent;
"use client"

import { Carousel } from 'antd';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MutableRefObject, useRef } from "react";
import BackgroupImage from "./BackgroupImage";
import { EventType } from '@/lib/type';

interface Props {
    events: EventType[]
}

const Banner = (data: Props) => {
    const ref: MutableRefObject<any | null> = useRef(null)
    return (
        <div className="mb-8 max-lg:mt-[100px] max-md:mt-[110px] relative">
            <Carousel
                autoplay
                autoplaySpeed={5000}
                pauseOnHover={true}
                draggable
                ref={ref}
            >
                {data.events && data.events.length !== 0 ? data.events.map((event, index) => (
                    <BackgroupImage key={index} src={event.imageUrl} page='home'/>
                ))
                    :
                    <BackgroupImage src="https://www.vizagchamber.com/uploads/9548c64d38fa1958bb77e4ae5a5bd118.jpg" page='home'/>
                }
            </Carousel>
            <button
                onClick={() => {
                    ref.current.next()
                }}
                className="absolute md:block hidden top-1/2 right-16 -translate-y-1/2 hover:bg-[#FF8E3C] hover:text-white transition-all duration-300 bg-white border rounded-full p-3">
                <GrFormNext size="24" />
            </button>
            <button
                onClick={() => {
                    ref.current.prev()
                }}
                className="absolute md:block hidden top-1/2 left-16 -translate-y-1/2  hover:bg-[#FF8E3C] hover:text-white transition-all duration-300  bg-white border rounded-full p-3">
                <GrFormPrevious size="24" />
            </button>

        </div>
    );
}

export default Banner;
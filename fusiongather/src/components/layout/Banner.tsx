"use client";

import { Carousel } from "antd";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { Key, MutableRefObject, useEffect, useRef, useState } from "react";
import BackgroupImage from "./BackgroupImage";
import { EventType, ImageType } from "@/lib/type";
import Link from "next/link";
import BannerSkeleton from "./BannerSkeleton";

interface Props {
  events: EventType[];
  imageSrc: ImageType[];
}

const Banner = (data: Props) => {
  const ref: MutableRefObject<any | null> = useRef(null);
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
if(data) setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])
  console.log(loading);
  
  return (
    <>
    {loading ? 
  <BannerSkeleton/>
  :  
  <div className="mb-8 max-lg:mt-[100px] max-md:mt-[110px] relative">
    
      <Carousel
        autoplay
        autoplaySpeed={5000}
        pauseOnHover={true}
        draggable
        ref={ref}
      >
        {data?.imageSrc && data?.imageSrc?.length !== 0 ? (
          data?.imageSrc.map((image: any, index: Key) => (
            <Link href={image[0].eventId.id ? `/event/${image[0].eventId.id}` : ''} key={index}>
              <BackgroupImage
              key={index}
              src={image[0]?.url}
              page="home"
            />
            </Link>
          ))
        ) : (
          <BackgroupImage
            src="https://www.vizagchamber.com/uploads/9548c64d38fa1958bb77e4ae5a5bd118.jpg"
            page="home"
          />
        )}
      </Carousel>
      <button
        onClick={() => {
          ref.current.next();
        }}
        className="absolute md:block hidden top-1/2 right-16 -translate-y-1/2 hover:bg-[#FF8E3C] hover:text-white transition-all duration-300 bg-white border rounded-full p-3"
      >
        <GrFormNext size="24" />
      </button>
      <button
        onClick={() => {
          ref.current.prev();
        }}
        className="absolute md:block hidden top-1/2 left-16 -translate-y-1/2  hover:bg-[#FF8E3C] hover:text-white transition-all duration-300  bg-white border rounded-full p-3"
      >
        <GrFormPrevious size="24" />
      </button>
    </div>
}
    </>
    
  );
};

export default Banner;
'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import BannerSkeleton from "./BannerSkeleton";
interface Props {
    page: "home" | "detail",
    src: string
}
const BackgroupImage = ({ page, src }: Props) => {
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
setLoading(false);
    },[src]);
    const backgroupClass = `${page === "home" ? "aspect-[2/1] md:aspect-[3/1]" : "aspect-[5/2]"}`
    const imageClass = `${page === "home" ? "md:aspect-[3/1] aspect-[2/1]" : "aspect-[5/2]"}`
    return (
        <>
        {loading? 

        <BannerSkeleton/>
        :
            <div>
                <div className={` ${backgroupClass} relative overflow-hidden  rounded-3xl`}>
                    <div className="bg-white opacity-80 absolute z-10 top-0 bottom-0 right-0 left-0"></div>
                    <Image src={src} fill alt="banner" className="w-full h-full hidden md:block object-cover scale-y-150 scale-x-110 overflow-hidden" />
                    <div className={`relative md:w-3/4 w-full h-full ${imageClass} mx-auto`}>
                        <Image src={src} fill alt="banner" className="  object-fill z-10 overflow-hidden" />
                    </div>
                </div>
            </div>
}
        </>
    );
}

export default BackgroupImage;
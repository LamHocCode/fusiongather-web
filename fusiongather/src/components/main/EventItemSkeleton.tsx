'use client';

import Skeleton from '@mui/material/Skeleton';


const EventItemSkeleton = () => {
    return (
        <div className="col-span-1 cursor-pointer border-[1px] border-slate-200 bg-slate-50 rounded-xl shadow-sm text-sm hover:shadow-xl transition-all duration-200">
            <div className="w-full">
                <div className="overflow-hidden rounded-xl relative aspect-[2/1]">
                    <Skeleton variant="rectangular" width={'100%'} height={200} />
                </div>
                <div className='pt-2 pb-3 px-4 flex flex-col justify-between'>
                    <div className='h-14'>
                    <Skeleton />
                    <Skeleton />
                    </div>
                    <Skeleton width="60%" />
                    <Skeleton />
                </div>
            </div>
        </div>
    );
}

export default EventItemSkeleton;
'use client';

import Skeleton from '@mui/material/Skeleton';

const BannerSkeleton = () => {
    return (
        <div className="mb-8 max-lg:mt-[100px] max-md:mt-[110px] w-full">
            <Skeleton variant="rectangular" width={'100%'} height={430} />
        </div>
    );
}

export default BannerSkeleton;
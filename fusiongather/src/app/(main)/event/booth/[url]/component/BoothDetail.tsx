"use client"

import { useEffect, useState } from 'react';
import { BoothType } from '@/lib/type';
import { object, set } from 'zod';


const BoothDetailPage = ({ booth }: { booth: BoothType }) => {
    const [data, setData] = useState<BoothType>(booth)
    return (
        <div>
            {data && (
                <div>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <p>{data.latitude}</p>
                    <p>{data.longitude}</p>
                    
                </div>
            )}
        </div>
    );
}

export default BoothDetailPage;

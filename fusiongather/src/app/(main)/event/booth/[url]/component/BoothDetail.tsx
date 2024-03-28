"use client"

import { useEffect, useState } from 'react';
import { BoothType } from '@/lib/type';
import { object, set } from 'zod';
import Content from './Content';


const BoothDetailPage = ({ booth, isOwner }: { booth: BoothType, isOwner: boolean }) => {
    const [data, setData] = useState<BoothType>(booth)
    return (
        <div>
            <section className="flex gap-8 py-10">
                <div className="w-[100%]">
                    <Content booth={data} isOwner={isOwner}/>
                </div>
            </section>
        </div>

    );
}

export default BoothDetailPage;

'use client'

import { useEffect, useState } from "react";

interface Props {
    currentTime: string,
    isRunning: boolean;
}

const CountDown = ({ currentTime, isRunning }: Props) => {
    const [time, setTime] = useState<string>(currentTime);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        const interval = setInterval(() => {
            // Giảm thời gian đi 1 giây
            const [minutes, seconds] = time.split(":").map(Number);
            if (seconds > 0) {
                setTime(`${minutes.toString().padStart(2, "0")}:${(seconds - 1).toString().padStart(2, "0")}`);
            } else if (minutes > 0) {
                setTime(`${(minutes - 1).toString().padStart(2, "0")}:59`);
            } else {
                clearInterval(interval);
                // Đã hết thời gian, xử lý logic tại đây
            }
        }, 1000);


        return () => {
            clearInterval(interval);
        };
    }, [time, isRunning]);

    const isLastFiveSeconds = Number(time.split(":")[0]) === 0 && Number(time.split(":")[1]) <= 5;

    return (
        <div className={isLastFiveSeconds ? 'text-rose-500' : 'text-secondary'}>
            {time}
        </div>
    );
}

export default CountDown;
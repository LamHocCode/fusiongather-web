
"use client"

import Empty from "@/components/shared/Empty";
import { formatTime } from "@/lib/Format";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    data: any
    searchString?: string | null,
    onClose: () => void,
    setSearchString: () => void,
    onCloseToggle?: () => void
}

const BodyOptionsSearch = ({ data, searchString, onClose, setSearchString, onCloseToggle }: Props) => {

    const router = useRouter()

    const handleClick = (event: any) => {
        router.push(`/event/${event?.id}`)
        onClose()
        setSearchString()
        if (onCloseToggle) {
            onCloseToggle()
        }
    }
    return (
        <div>
            {data && data.length > 0 ?
                <>
                    <div className="mb-2">
                        Search &nbsp;
                        <span className="text-primary">
                            &apos;
                            {searchString}
                            &apos;
                        </span>
                    </div>
                    {data.map((item: any) => (
                        <div
                            onClick={() => handleClick(item)}
                            key={item?._id}
                            className="flex flex-col gap-1 px-2 py-1 cursor-pointer hover:bg-primary hover:text-white rounded-md group"
                        >
                            <div className="flex-1 truncate">
                                {item.title}
                            </div>
                            <div className="italic flex text-xs text-gray-400 group-hover:text-white">
                                <div>
                                                From {formatTime(item?.startDateTime)}
                                            </div>
                                            <span className="px-1">-</span>
                                            <div>
                                                To {formatTime(item?.endDateTime)}
                                            </div>
                            </div>
                        </div>
                    ))
                    }
                </>
                :
                <Empty keyword={searchString!} className="relative w-36 h-32" />
            }
        </div>
    );
}

export default BodyOptionsSearch;

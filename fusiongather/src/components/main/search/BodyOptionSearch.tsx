
"use client"

import Empty from "@/components/shared/Empty";
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
                            key={item._id}
                            className="flex items-center gap-6 px-2 py-4 cursor-pointer hover:bg-primary hover:text-white rounded-md"
                        >
                            <div >
                                <Image
                                    src={'/test-event.png'}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="object-contain rounded-md"
                                />
                            </div>
                            <div className="flex-1 truncate">
                                {item.title}
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

import Image from "next/image";
interface Props {
    keyword: string,
    className: string
}
const Empty = ({ keyword, className }: Props) => {
    return (
        <div className="w-full flex justify-center items-center mb-20">
            <div className="flex flex-col items-center gap-4 justify-center">
                <div className={className}>
                    <Image
                        src={'/assets/icons/noti-search.png'}
                        alt="nothing search"
                        className="object-contain"
                        fill
                    />
                </div>
                <h3 className="sm:text-xl text-sm text-center font-medium text-gray-500">
                    Sorry, &nbsp;
                    <span className="text-primary">
                        &apos;{keyword}&apos;
                    </span>
                    &nbsp;
                    does not match the results.
                </h3>
            </div>
        </div>
    );
}

export default Empty;

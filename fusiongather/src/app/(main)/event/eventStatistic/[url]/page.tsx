import EventStatisticBox from "./component/EventStatisticBox";


interface Props{
    params: {
        url: string;
    }
}

export default function EventStatistic({params: {url}}: Props) {
    const eventId = Number(url);
    return (
        <>
            <section className="flex items-center justify-between">
                <EventStatisticBox eventId={eventId}/>
            </section>
        </>
    )
}
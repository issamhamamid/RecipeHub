import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";

export const DayJs = () => {

    dayjs.extend(relativeTime);
    const a  =dayjs('2025-01-23 09:09:28.627+00').fromNow()
    return (
        <>
            <h1>{a}</h1>
        </>
    )
}
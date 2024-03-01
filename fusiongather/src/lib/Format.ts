export function format(createdAt: string) {
    const date = new Date(createdAt);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const result = `${month}, ${year}`;
    return result;
}

export function formatToDay(createdAt: string) {
    const date = new Date(createdAt);
    return date.toLocaleString('en-US', { day: 'numeric' });
}

export function formatToWeek(createdAt: string) {
    const date = new Date(createdAt);
    return date.toLocaleString('en-US', { weekday: 'long' });
}

export function formatTime(time: string) {
    const date = new Date(time);
    const monthsAbbreviated = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    let ampm = "AM";
    if (hours >= 12) {
        ampm = "PM";
        hours -= 12;
    }
    if (hours === 0) {
        hours = 12;
    }
    const monthAbbreviated = monthsAbbreviated[monthIndex];
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${day} ${monthAbbreviated} ${year}, ${formattedHours}:${formattedMinutes} ${ampm}`
}
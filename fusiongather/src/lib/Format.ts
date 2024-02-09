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
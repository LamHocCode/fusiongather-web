export interface GetAllEventType {
    searchString?: string,
    pageNumber?: number,
    pageSize?: number,
    userId?: number,
}

export interface EventType {
    id: number,
    title: string,
    description: string,
    location: string,
    imageUrl: string,
    startDateTime: string,
    endDateTime: string,
    price: string,
    lng: number,
    lat: number,
    isFree: boolean
}
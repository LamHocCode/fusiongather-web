export interface GetAllEventType {
    searchString?: string,
    pageNumber?: number,
    pageSize?: number,
    category?: number,
    userId?: number,
}

export interface EventType {
    id: number,
    title: string,
    description: string,
    location: string,
    imageUrl: string[],
    category: string,
    startDateTime: string,
    endDateTime: string,
    price: string,
    lng: number,
    lat: number,
    isFree: boolean,
    author: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        dob: string,
        phoneNumber: string
    }
    isPublished: boolean
}

export type BoothType = {
    id: number,
    name: string,
    description: string,
    imageUrl: string[],
    latitude: number,
    longitude: number,
    eventId: {
        id: number,
        title: string,
        description: string,
        location: string,
        imageUrl: string[],
        startDateTime: string,
        endDateTime: string,
        price: string,
        lng: number,
        lat: number,
        isFree: boolean,
        isPublished: boolean,
    },
    vendorId: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string
    },

}

export interface ImageType {
    id: number,
    url: string,
    eventId?: number,
    boothId?: number,
}

export interface RequestType {
    userId: number,
    boothId: number,
    reason: string,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        dob: string,
        isAdmin: boolean,
        phoneNumber: string
    },
    booth: {
        id: number,
        name: string,
        description: string,
    }

}

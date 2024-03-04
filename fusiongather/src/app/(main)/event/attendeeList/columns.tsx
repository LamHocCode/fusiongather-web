export type Ticket = {
    id: number
    isScanned: boolean
    userId: {
        id: number
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
    }
}

export const columns = [ 
    {
        key: "firstName",
        label: "First Name",
    },
    {
        key: "lastName",
        label: "Last Name",
    },
    {
        key: "email",
        label: "Email",
    },
    {
        key: "phoneNumber",
        label: "Phone Number",
    },
    {
        key: "isScanned",
        label: "Scanned",
    },
]
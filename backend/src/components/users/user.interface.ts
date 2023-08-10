

export interface IUser {
    id: string,
    createdAt: string,
    timeZoneOffset: number,
    name: string,
    email: string
}


export interface IFreeSlots {
    startTime: string,
    endTime: string
}
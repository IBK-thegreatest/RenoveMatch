import { Request } from "express"
export interface DataStoredInToken {
    id: any
    role: string
}

export interface RequestWithId extends Request {
    user: any
}
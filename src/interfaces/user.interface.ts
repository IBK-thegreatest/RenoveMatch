export interface Register {
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: string
}

export interface Login {
    email: string
    password: string
}

export interface User extends Register {
    token: string
}

export interface AllUserData extends Register {
    id?: any
}

export interface PasswordResetData {
    email: string
}
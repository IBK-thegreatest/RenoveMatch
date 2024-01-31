export interface Register {
    username: string
    email: string
    password: string
    role: string
}

export interface Login {
    email: string
    password: string
}

export interface User extends Register {
    token: string
}
import { Request, Response, NextFunction } from "express"
import { loginService, passwordResetService, registerService } from "../services/auth.services"

//REGISTER A USER
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const registerData = await registerService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User has been Successfully registered",
            data: registerData
        })
    } catch (error) {
        next(error)
    }
}

//LOGIN AN EXISTING USER
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const loginData = await loginService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "You are now logged In",
            data: loginData
        })
    } catch (error) {
        next(error)
    }
}

//PASSWORD RESET API
export const passwordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body
        const resetData = await passwordResetService(userData)
        res.status(200).json({
            success: true,
            status: "OK",
            newpassword: resetData,
            message: `Your Password has been reset, your new password is ${resetData}`
        })
    } catch (error) {
        next(error)
    }
}
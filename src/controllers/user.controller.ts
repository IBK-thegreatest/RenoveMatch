import { Request, Response, NextFunction } from "express"
import { deleteUserService, getAllUsersService, getUserService, updateUserService } from "../services/user.services"

//GET ALL USERS
export const getAllusers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await getAllUsersService()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

//GET A USER
export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const user = await getUserService(userId)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//UPDATE USER INFORMATION
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        const userData = req.body
        const updateUser = await updateUserService(userId, userData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "User Information has been Successfully Updated",
            data: updateUser
        })
    } catch (error) {
        next(error)
    }
}

//DELETE USER INFORMATION
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id
        await deleteUserService(userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "User Information has been Successfully deleted"
                })
            }).catch(err => {
                res.status(500).json(err)
            })
    } catch (error) {
        next(error)
    }
}
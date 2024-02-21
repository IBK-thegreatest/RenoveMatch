import { AllUserData } from "../interfaces/user.interface";
import userModel from "../models/User";
import bcrypt from "bcrypt"
import HttpException from "../exceptions/HttpException";
import { emailValidator, schema } from "../middlewares/validation.middleware";

//GET ALL USERS
export const getAllUsersService = async (): Promise<AllUserData[]> => {
    const users: AllUserData[] = await userModel.find()
    if(users.length === 0) throw new HttpException(401, "There are no users here")
    return users
}

//GET A USER
export const getUserService = async (userId: string): Promise<AllUserData> => {
    const user: AllUserData = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "This user does not exist")
    return user
}

//UPDATE USER INFORMATION
export const updateUserService = async (userId: string, userData: AllUserData): Promise<AllUserData> => {
    const user: AllUserData = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A User with this ID does not exist")
    if(userData.email) {
        if(!emailValidator.validate(userData.email)) throw new HttpException(403, "Invalid Email Address, make sure your email is in the format foo@bar.com")
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { email: userData.email }},
            { new: true }
        )
        return updatedUser
    } else if (userData.password) {
        if(!schema.validate(userData.password)) throw new HttpException(403, "Invalid Password, password must have an uppercase letter, lowercase letter, no whitespaces and at least 2 digits")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(userData.password, salt)
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword }},
            { new: true }
        )
        return updatedUser
    } else {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: userData },
            { new: true }
        )
        return updatedUser
    }
}

//DELETE USER INFORMATION
export const deleteUserService = async (userId: string): Promise<AllUserData> => {
    const user: AllUserData = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A User with this ID does not exist")

    await userModel.findByIdAndDelete(userId)
    return user
}

//GET ALL HOMEOWNERS
export const getHomeownersService = async (): Promise<AllUserData[]> => {
    const homeowners: AllUserData[] = await userModel.find({ role: "homeowners"})
    return homeowners
}

//GET ALL CONTRACTORS
export const getContractorsService = async (): Promise<AllUserData[]> => {
    const contractors: AllUserData[] = await userModel.find({ role: "contractors"})
    return contractors
}

//GET ALL SUPPLIERS
export const getSuppliersService = async (): Promise<AllUserData[]> => {
    const suppliers: AllUserData[] = await userModel.find({ role: "suppliers"})
    return suppliers
}
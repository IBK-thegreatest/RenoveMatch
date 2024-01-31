import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Login, Register, User } from "../interfaces/user.interface";
import userModel from "../models/User";
import { emailValidator, schema } from "../middlewares/validation.middleware";
import { DataStoredInToken } from "../interfaces/auth.interface";

//REGISTER A USER
export const registerService = async (userData: Register): Promise<Register> => {
    const alreadyExistsUser = await userModel.findOne({ email: userData.email })
    if(alreadyExistsUser) throw new HttpException(409, "This User Already Exists")

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(userData.password, salt)
    const data = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
    }

    if(userData.username.length < 6) {
        throw new HttpException(403, "The Username must be at least 6 characters long")
    } else if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, your email address must be in the format foo@bar.com")
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid password, password must be at least 8 characters long. It should also contain uppercase, lowercase no white spaces and at least 2 digits")
    } else {
        const newUser = new userModel(data)
        const createUser = await newUser.save()
        return createUser
    }
}

//LOGIN AN EXISTING USER
export const loginService = async (userData: Login): Promise<User> => {
    const user = await userModel.findOne({ email: userData.email })
    if(!user) throw new HttpException(404, "User Not Found!!!")

    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password)
    if(!isPasswordCorrect) throw new HttpException(403, "Username and Password don't match")

    const dataStoredInToken: DataStoredInToken = {
        id: user._id,
        role: user.role
    }
    const accessToken = jwt.sign(dataStoredInToken, process.env.JWT_SEC, { expiresIn: "24h" })
    const tokenData: User = {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        token: accessToken
    }
    return tokenData
}
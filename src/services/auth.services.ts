import HttpException from "../exceptions/HttpException";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Login, PasswordResetData, Register, User } from "../interfaces/user.interface";
import userModel from "../models/User";
import { emailValidator, phoneNumberPattern, schema } from "../middlewares/validation.middleware";
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
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        role: userData.role
    }

    if(userData.username.length < 6) {
        throw new HttpException(403, "The Username must be at least 6 characters long")
    } else if (!emailValidator.validate(userData.email)) {
        throw new HttpException(403, "Invalid Email Address, your email address must be in the format foo@bar.com")
    } else if (!schema.validate(userData.password)) {
        throw new HttpException(403, "Invalid password, password must be at least 8 characters long. It should also contain uppercase, lowercase no white spaces and at least 2 digits")
    } else if (!phoneNumberPattern.test(userData.phoneNumber)){
        throw new HttpException(403, "Invalid Phone Number, Phone Number should be only 11 digits")
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
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        token: accessToken
    }
    return tokenData
}

//PASSWORD RESET SERVICE
export const passwordResetService = async (userData: PasswordResetData) => {
    const user = await userModel.findOne({ email: userData.email })
    if(!user) throw new HttpException(404, "A user with this email does not exist")

    function generateRandomAlphanumeric(length: number) {
        const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString: string = "";
      
        for (let i = 0; i < length; i++) {
          const randomIndex: number = Math.floor(Math.random() * characters.length);
          randomString += characters.charAt(randomIndex);
        }
      
        return randomString;
    }
    const resetPassword = generateRandomAlphanumeric(10)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(resetPassword, salt)
    await userModel.findOneAndUpdate(
        user._id,
        { $set: { password: hashedPassword } },
        { new: true }
    )
    return resetPassword
}
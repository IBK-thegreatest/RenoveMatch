import express, { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import contractorRoutes from "./routes/contractor.routes"
import materialRoutes from "./routes/material.routes"
import homeownerRoutes from "./routes/homeowner.routes"
import orderRoutes from "./routes/order.routes"
import quotesRoutes from "./routes/quotes.routes"
import projectRoutes from "./routes/project.routes"
import supplierRoutes from "./routes/supplier.routes"
import HttpException from "exceptions/HttpException"

dotenv.config();
mongoose.connect(
    process.env.MONGO_URL
).then(() => {
    console.log("Database Connection Successful");
}).catch(err => {
    console.log(err);
})

const app = express()
app.use(express.json())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/contractors", contractorRoutes)
app.use("/api/v1/materials", materialRoutes)
app.use("/api/v1/homeowners", homeownerRoutes)
app.use("/api/v1/order", orderRoutes)
app.use("/api/v1/quotes", quotesRoutes)
app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/suppliers", supplierRoutes)
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const errorStatus: number = err.status || 500
    const errorMessage: string = err.message || "something went wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const port: number = 5000
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`);
})
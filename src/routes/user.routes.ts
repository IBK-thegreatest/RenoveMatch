import express, { Router } from "express"
import { verifyAdmin, verifyHomeowner, verifyUser } from "../middlewares/auth.middleware"
import { deleteUser, getAllusers, getContractors, getHomeowners, getSuppliers, getUser, updateUser } from "../controllers/user.controller"
const router: Router = express.Router()

//GET ALL USERS
router.get("/", verifyAdmin, getAllusers)

//GET A USER
router.get("/:id", verifyUser, getUser)

//UPDATE USER
router.put("/:id", verifyUser, updateUser)

//DELETE USER
router.delete("/:id", verifyUser, deleteUser)

//GET ALL HOMEOWNERS
router.get("/homeowners", verifyAdmin, getHomeowners)

//GET ALL CONTRACTORS
router.get("/contractors", verifyHomeowner, getContractors)

//GET ALL SUPPLIERS
router.get("/suppliers", verifyHomeowner, getSuppliers)


export default router
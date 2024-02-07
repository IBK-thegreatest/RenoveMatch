import express, { Router } from "express"
import { verifyAdmin, verifyUser } from "../middlewares/auth.middleware"
import { deleteUser, getAllusers, getUser, updateUser } from "../controllers/user.controller"
const router: Router = express.Router()

//GET ALL USERS
router.get("/", verifyAdmin, getAllusers)

//GET A USER
router.get("/:id", verifyUser, getUser)

//UPDATE USER
router.put("/:id", verifyUser, updateUser)

//DELETE USER
router.delete("/:id", verifyUser, deleteUser)


export default router
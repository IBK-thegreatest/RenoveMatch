import express, { Router } from "express"
import { verifyHomeowner, verifyToken, verifyUser } from "../middlewares/auth.middleware"
import { createQuote, deleteQuote, getAllQuotes, updateQuote } from "../controllers/quotes.controller"
const router: Router = express.Router()

//CREATE A MATERIAL
router.post("/", verifyHomeowner, createQuote)

//GET ALL MATERIALS
router.get("/", verifyToken, getAllQuotes)

//UPDATE MATERIAL INFORMATION
router.put("/:userId/:materialId", verifyUser, verifyHomeowner, updateQuote)

//DELETE MATERIAL INFORMATION
router.delete("/:userId/:materialId", verifyUser, verifyHomeowner, deleteQuote)



export default router
import express, { Router } from "express"
import { verifyAdmin, verifyContractor, verifyHomeowner, verifyToken, verifyUser } from "../middlewares/auth.middleware"
import { createMaterial, deleteMaterial, getAllMaterials, updateMaterial } from "../controllers/material.controller"
const router: Router = express.Router()

//CREATE A Material
router.post("/", verifyHomeowner, createMaterial)

//GET ALL MaterialS
router.get("/", verifyToken, getAllMaterials)

//UPDATE Material INFORMATION
router.put("/:userId/:homeownerId/:materialId", verifyUser, verifyHomeowner, updateMaterial)

//DELETE Material INFORMATION
router.delete("/:userId/:homeownerId/:materialId", verifyUser, verifyHomeowner, deleteMaterial)


export default router
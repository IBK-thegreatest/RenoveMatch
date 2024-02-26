import express, { Router } from "express"
import { verifyHomeowner, verifyToken, verifyUser } from "../middlewares/auth.middleware"
import { createMaterial, deleteMaterial, getAllMaterials, updateMaterial } from "../controllers/material.controller"
const router: Router = express.Router()

//CREATE A MATERIAL
router.post("/", verifyHomeowner, createMaterial)

//GET ALL MATERIALS
router.get("/", verifyToken, getAllMaterials)

//UPDATE MATERIAL INFORMATION
router.put("/:userId/:materialId", verifyUser, verifyHomeowner, updateMaterial)

//DELETE MATERIAL INFORMATION
router.delete("/:userId/:materialId", verifyUser, verifyHomeowner, deleteMaterial)


export default router
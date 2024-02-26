import { Request, Response, NextFunction } from "express";
import { createMaterialService, deleteMaterialService, getAllMaterialsService, updateMaterialService } from "../services/material.services";
import { RequestWithId } from "../interfaces/auth.interface";

//CREATE A MATERIAL
export const createMaterial = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const homeownerId = req.user.id
        const materialData = req.body
        const createMaterialData = await createMaterialService(homeownerId, materialData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Material has been created",
            data: createMaterialData
        })
    } catch (error) {
        next(error)
    }
}

//GET ALL MATERIALS
export const getAllMaterials = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const materials = await getAllMaterialsService();
        res.status(200).json(materials)
    } catch (error) {
        next(error)
    }
}

//UPDATE MATERIAL INFORMATION
export const updateMaterial = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const materialId = req.params.materialId
        const materialData = req.body
        const updateMaterialData = await updateMaterialService(userId, materialId, materialData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Material Information has been updated successfully",
            data: updateMaterialData
        })
    } catch (error) {
        next(error)
    }
}

//DELETE MATERIAL INFORMATION
export const deleteMaterial = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const materialId = req.params.MaterialId
        const homeownerId = req.params.homeownerId
        await deleteMaterialService(userId, materialId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Material has been successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}
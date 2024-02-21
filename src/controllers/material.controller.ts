import { Request, Response, NextFunction } from "express";
import { createMaterialService, deleteMaterialService, getAllMaterialsService, getContractorMaterialsService, getHomeownerMaterialsService, updateMaterialService } from "../services/material.services";
import { RequestWithId } from "../interfaces/auth.interface";

//CREATE A Material
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

//GET ALL MaterialS
export const getAllMaterials = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const materials = await getAllMaterialsService();
        res.status(200).json(materials)
    } catch (error) {
        next(error)
    }
}

//GET ALL MaterialS BY A SPECIFIC CONTRACTOR
export const getContractorMaterials = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const contractorId = req.params.contractorId
        const contractorMaterials = await getContractorMaterialsService(userId, contractorId)
        res.status(200).json(contractorMaterials)
    } catch (error) {
        next(error)
    }
}

//GET ALL MaterialS OWNED BY A SPECIFIC HOMEOWNER
export const getHomeownerMaterials = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const homeownerId = req.params.homeownerId
        const homeownerMaterials = await getHomeownerMaterialsService(userId, homeownerId)
        res.status(200).json(homeownerMaterials)
    } catch (error) {
        next(error)
    }
}

//UPDATE Material INFORMATION
export const updateMaterial = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const materialId = req.params.materialId
        const homeownerId = req.params.homeownerId
        const materialData = req.body
        const updateMaterialData = await updateMaterialService(userId, homeownerId, materialId, materialData)
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

//DELETE Material INFORMATION
export const deleteMaterial = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const MaterialId = req.params.MaterialId
        const homeownerId = req.params.homeownerId
        await deleteMaterialService(userId, homeownerId, MaterialId)
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
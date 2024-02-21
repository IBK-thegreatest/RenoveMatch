import materialModel from "../models/Material";
import { Material } from "../interfaces/material.interface";
import userModel from "../models/User";
import HttpException from "../exceptions/HttpException";

//CREATE A Material
export const createMaterialService = async (supplierId: string, MaterialData: Material): Promise<Material> => {
    const data = {
        supplierId: supplierId,
        
    }
    const newMaterial = new materialModel(data)
    const createMaterial: Material = await newMaterial.save();
    return createMaterial
}

//GET ALL MaterialS
export const getAllMaterialsService = async (): Promise<Material[]> => {
    const materials: Material[] = await materialModel.find()
    return materials
}

//GET ALL MaterialS OVERSEEN BY A SPECIFIC CONTRACTOR
export const getContractorMaterialsService = async (userId: string, contractorId: string): Promise<Material[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const materials: Material[] = await materialModel.find({ contractorId: contractorId })
    return materials
}

//GET ALL MaterialS OF AN HOMEOWNER
export const getHomeownerMaterialsService = async (userId: string, homeownerId: string): Promise<Material[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const materials: Material[] = await materialModel.find({ homeownerId: homeownerId })
    return materials
}

//UPDATE Material INFORMATION
export const updateMaterialService = async (userId: string, homeownerId: string, materialId: string, MaterialData: Material): Promise<Material> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const material = await materialModel.findById(materialId)
    if(!material) throw new HttpException(404, "A Material with this MaterialId does not exist")

    const updateMaterial = await materialModel.findByIdAndUpdate(
        materialId,
        { $set: MaterialData },
        { new: true }
    )
    return updateMaterial
}

//DELETE Material INFORMATION
export const deleteMaterialService = async (userId: string, homeownerId: string, MaterialId: string): Promise<void> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const material = await materialModel.findById(MaterialId)
    if(!material) throw new HttpException(404, "A Material with this MaterialId does not exist")

    await materialModel.findByIdAndDelete(MaterialId)
}
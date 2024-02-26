import materialModel from "../models/Material";
import { Material } from "../interfaces/material.interface";
import userModel from "../models/User";
import HttpException from "../exceptions/HttpException";

//CREATE A MATERIAL
export const createMaterialService = async (supplierId: string, materialData: Material): Promise<Material> => {
    const data = {
        supplierId: supplierId,
        materialName: materialData.materialName,
        description: materialData.description,
        price: materialData.price,
        quantity: materialData.quantity,
    }
    const newMaterial = new materialModel(data)
    const createMaterial: Material = await newMaterial.save();
    return createMaterial
}

//GET ALL MATERIALS
export const getAllMaterialsService = async (): Promise<Material[]> => {
    const materials: Material[] = await materialModel.find()
    return materials
}

//UPDATE MATERIAL INFORMATION
export const updateMaterialService = async (userId: string, materialId: string, MaterialData: Material): Promise<Material> => {
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

//DELETE MATERIAL INFORMATION
export const deleteMaterialService = async (userId: string, materialId: string): Promise<void> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const material = await materialModel.findById(materialId)
    if(!material) throw new HttpException(404, "A Material with this MaterialId does not exist")

    await materialModel.findByIdAndDelete(materialId)
}
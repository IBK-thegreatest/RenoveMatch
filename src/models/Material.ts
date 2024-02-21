import mongoose from "mongoose"

const MaterialSchema = new mongoose.Schema(
    {
        supplierId: {
            type: String,
            required: true
        },
        materialName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const materialModel = mongoose.model("Material", MaterialSchema)

export default materialModel
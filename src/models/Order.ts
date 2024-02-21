import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
    {
        homeownerId: {
            type: String,
            required: true
        },
        supplierId: {
            type: String,
            required: true
        },
        orderDeliveryDate: {
            type: Date,
            required: true
        },
        orderDetails: {
            type: String,
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

const orderModel = mongoose.model("Order", OrderSchema)

export default orderModel
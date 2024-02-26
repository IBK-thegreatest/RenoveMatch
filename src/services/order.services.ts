import orderModel from "../models/Order";
import { Order } from "../interfaces/order.interface";
import userModel from "../models/User";
import HttpException from "../exceptions/HttpException";

//CREATE A Order
export const createOrderService = async (supplierId: string, homeownerId: string, orderData: Order): Promise<Order> => {
    const data: Order = {
        supplierId: supplierId,
        homeownerId: homeownerId,
        orderDeliveryDate: orderData.orderDeliveryDate,
        orderDetails: orderData.orderDetails,
        quantity: orderData.quantity,
    }
    const newOrder = new orderModel(data)
    const createOrder: Order = await newOrder.save();
    return createOrder
}

//GET ALL OrderS
export const getAllOrdersService = async (): Promise<Order[]> => {
    const Orders: Order[] = await orderModel.find()
    return Orders
}

//UPDATE Order INFORMATION
export const updateOrderService = async (userId: string, orderId: string, OrderData: Order): Promise<Order> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const Order = await orderModel.findById(orderId)
    if(!Order) throw new HttpException(404, "A Order with this OrderId does not exist")

    const updateOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: OrderData },
        { new: true }
    )
    return updateOrder
}

//DELETE Order INFORMATION
export const deleteOrderService = async (userId: string, orderId: string): Promise<void> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const Order = await orderModel.findById(orderId)
    if(!Order) throw new HttpException(404, "A Order with this OrderId does not exist")

    await orderModel.findByIdAndDelete(orderId)
}
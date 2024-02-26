import { Request, Response, NextFunction } from "express";
import { createOrderService, deleteOrderService, getAllOrdersService, updateOrderService } from "../services/order.services";
import { RequestWithId } from "../interfaces/auth.interface";

//CREATE A ORDER
export const createOrder = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const supplierId = req.user.id
        const homeownerId = req.params.homeownerId
        const orderData = req.body
        const createOrderData = await createOrderService(supplierId, homeownerId, orderData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Order has been created",
            data: createOrderData
        })
    } catch (error) {
        next(error)
    }
}

//GET ALL ORDERS
export const getAllOrders = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orders = await getAllOrdersService();
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

//UPDATE ORDER INFORMATION
export const updateOrder = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const orderId = req.params.orderId
        const orderData = req.body
        const updateOrderData = await updateOrderService(userId, orderId, orderData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Order Information has been updated successfully",
            data: updateOrderData
        })
    } catch (error) {
        next(error)
    }
}

//DELETE ORDER INFORMATION
export const deleteOrder = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const orderId = req.params.orderId
        await deleteOrderService(userId, orderId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Order has been successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}
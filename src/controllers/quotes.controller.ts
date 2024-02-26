import { Request, Response, NextFunction } from "express";
import { createQuoteService, deleteQuoteService, getAllQuotesService, updateQuoteService } from "../services/quote.services";
import { RequestWithId } from "../interfaces/auth.interface";

//CREATE A Quote
export const createQuote = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const contractorId = req.user.id
        const quoteData = req.body
        const createQuoteData = await createQuoteService(contractorId, quoteData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Quote has been created",
            data: createQuoteData
        })
    } catch (error) {
        next(error)
    }
}

//GET ALL QuoteS
export const getAllQuotes = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const quotes = await getAllQuotesService();
        res.status(200).json(quotes)
    } catch (error) {
        next(error)
    }
}

//UPDATE Quote INFORMATION
export const updateQuote = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const quoteId = req.params.QuoteId
        const quoteData = req.body
        const updateQuoteData = await updateQuoteService(userId, quoteId, quoteData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Quote Information has been updated successfully",
            data: updateQuoteData
        })
    } catch (error) {
        next(error)
    }
}

//DELETE Quote INFORMATION
export const deleteQuote = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const QuoteId = req.params.QuoteId
        const homeownerId = req.params.homeownerId
        await deleteQuoteService(userId, QuoteId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Quote has been successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}
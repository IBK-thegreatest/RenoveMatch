import quoteModel from "../models/Quote";
import { Quote } from "../interfaces/quote.interface";
import userModel from "../models/User";
import HttpException from "../exceptions/HttpException";

//CREATE A QUOTE
export const createQuoteService = async (contractorId: string, quoteData: Quote): Promise<Quote> => {
    const data = {
        contractorId: contractorId,
        projectId: quoteData.projectId,
        quoteDetails: quoteData.quoteDetails,
        quoteAmount: quoteData.quoteAmount,
        submissionDate: quoteData.submissionDate,
    }
    const newQuote = new quoteModel(data)
    const createQuote: Quote = await newQuote.save();
    return createQuote
}

//GET ALL QUOTES
export const getAllQuotesService = async (): Promise<Quote[]> => {
    const Quotes: Quote[] = await quoteModel.find()
    return Quotes
}

//UPDATE QUOTE INFORMATION
export const updateQuoteService = async (userId: string, quoteId: string, quoteData: Quote): Promise<Quote> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const quote = await quoteModel.findById(quoteId)
    if(!quote) throw new HttpException(404, "A Quote with this QuoteId does not exist")

    const updateQuote = await quoteModel.findByIdAndUpdate(
        quoteId,
        { $set: quoteData },
        { new: true }
    )
    return updateQuote
}

//DELETE QUOTE INFORMATION
export const deleteQuoteService = async (userId: string, quoteId: string): Promise<void> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const quote = await quoteModel.findById(quoteId)
    if(!quote) throw new HttpException(404, "A Quote with this QuoteId does not exist")

    await quoteModel.findByIdAndDelete(quoteId)
}
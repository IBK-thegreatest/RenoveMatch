import mongoose from "mongoose"

const QuoteSchema = new mongoose.Schema(
    {
        projectId: {
            type: String,
            required: true
        },
        contractorId: {
            type: String,
            required: true
        },
        quoteAmount: {
            type: Number,
            required: true
        },
        quoteDetails: {
            type: String,
            required: true
        },
        submissionDate: {
            type: Date,
            required: true
        }
    }
)

const quoteModel = mongoose.model("Quote", QuoteSchema)

export default quoteModel
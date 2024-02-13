import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
    {
        homeownerId: {
            type: String,
            required: true
        },
        contractorId: {
            type: String,
            required: true
        },
        projectDescription: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: ["open", "assigned", "completed"],
            default: "open"
        }
    }
);

const projectModel = mongoose.model("Project", ProjectSchema)

export default projectModel
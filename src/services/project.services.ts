import projectModel from "../models/Project";
import { Project } from "../interfaces/project.interface";
import userModel from "../models/User";
import HttpException from "../exceptions/HttpException";

//CREATE A PROJECT
export const createProjectService = async (homeownerId: string, projectData: Project): Promise<Project> => {
    const data = {
        homeownerId: homeownerId,
        contractorId: projectData.contractorId,
        projectDescription: projectData.projectDescription,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        status: projectData.status
    }
    const newProject = new projectModel(data)
    const createProject: Project = await newProject.save();
    return createProject
}

//GET ALL PROJECTS
export const getAllProjectsService = async (): Promise<Project[]> => {
    const projects: Project[] = await projectModel.find()
    return projects
}

//GET ALL PROJECTS OVERSEEN BY A SPECIFIC CONTRACTOR
export const getContractorProjectsService = async (userId: string, contractorId: string): Promise<Project[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const projects: Project[] = await projectModel.find({ contractorId: contractorId })
    return projects
}

//GET ALL PROJECTS OF AN HOMEOWNER
export const getHomeownerProjectsService = async (userId: string, homeownerId: string): Promise<Project[]> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const projects: Project[] = await projectModel.find({ homeownerId: homeownerId })
    return projects
}

//UPDATE PROJECT INFORMATION
export const updateProjectService = async (userId: string, homeownerId: string, projectId: string, projectData: Project): Promise<Project> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const project = await projectModel.findById(projectId)
    if(!project) throw new HttpException(404, "A project with this projectId does not exist")

    if(!(project.homeownerId === homeownerId)) throw new HttpException(403, "This Project does not belong to you, you are not authorized to do this")
    const updateProject = await projectModel.findByIdAndUpdate(
        projectId,
        { $set: projectData },
        { new: true }
    )
    return updateProject
}

//DELETE PROJECT INFORMATION
export const deleteProjectService = async (userId: string, homeownerId: string, projectId: string): Promise<void> => {
    const user = await userModel.findById(userId)
    if(!user) throw new HttpException(404, "A user with this userId does not exist")
    const project = await projectModel.findById(projectId)
    if(!project) throw new HttpException(404, "A project with this projectId does not exist")

    if(!(project.homeownerId === homeownerId)) throw new HttpException(403, "This Project does not belong to you, you are not authorized to do this")
    await projectModel.findByIdAndDelete(projectId)
}
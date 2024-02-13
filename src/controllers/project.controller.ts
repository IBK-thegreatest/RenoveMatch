import { Request, Response, NextFunction } from "express";
import { createProjectService, deleteProjectService, getAllProjectsService, getContractorProjectsService, getHomeownerProjectsService, updateProjectService } from "../services/project.services";
import { RequestWithId } from "../interfaces/auth.interface";

//CREATE A PROJECT
export const createProject = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const homeownerId = req.user.id
        const projectData = req.body
        const createProjectData = await createProjectService(homeownerId, projectData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "A New Project has been created",
            data: createProjectData
        })
    } catch (error) {
        next(error)
    }
}

//GET ALL PROJECTS
export const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projects = await getAllProjectsService();
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}

//GET ALL PROJECTS BY A SPECIFIC CONTRACTOR
export const getContractorProjects = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const contractorId = req.params.contractorId
        const contractorProjects = await getContractorProjectsService(userId, contractorId)
        res.status(200).json(contractorProjects)
    } catch (error) {
        next(error)
    }
}

//GET ALL PROJECTS OWNED BY A SPECIFIC HOMEOWNER
export const getHomeownerProjects = async (req: RequestWithId, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id
        const homeownerId = req.params.homeownerId
        const homeownerProjects = await getHomeownerProjectsService(userId, homeownerId)
        res.status(200).json(homeownerProjects)
    } catch (error) {
        next(error)
    }
}

//UPDATE PROJECT INFORMATION
export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const projectId = req.params.projectId
        const homeownerId = req.params.homeownerId
        const projectData = req.body
        const updateProjectData = await updateProjectService(userId, homeownerId, projectId, projectData)
        res.status(200).json({
            success: true,
            status: "OK",
            message: "Project Information has been updated successfully",
            data: updateProjectData
        })
    } catch (error) {
        next(error)
    }
}

//DELETE PROJECT INFORMATION
export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.userId
        const projectId = req.params.projectId
        const homeownerId = req.params.homeownerId
        await deleteProjectService(userId, homeownerId, projectId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    status: "OK",
                    message: "Project has been successfully deleted"
                })
            })
    } catch (error) {
        next(error)
    }
}
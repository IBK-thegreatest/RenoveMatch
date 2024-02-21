import express, { Router } from "express"
import { verifyAdmin, verifyContractor, verifyHomeowner, verifyToken, verifyUser } from "../middlewares/auth.middleware"
import { createProject, deleteProject, getAllProjects, getContractorProjects, getHomeownerProjects, updateProject } from "../controllers/project.controller"
const router: Router = express.Router()

//CREATE A PROJECT
router.post("/", verifyHomeowner, createProject)

//GET ALL PROJECTS
router.get("/", verifyToken, getAllProjects)

//GET ALL PROJECTS BY CONTRACTORS
router.get("/:contractorId", verifyUser, verifyContractor, getContractorProjects)

//GET ALL PROJECTS BY HOMEOWNERS
router.get("/:homeownerId", verifyUser, verifyHomeowner, getHomeownerProjects)

//UPDATE PROJECT INFORMATION
router.put("/:userId/:homeownerId/:projectId", verifyUser, verifyHomeowner, updateProject)

//DELETE PROJECT INFORMATION
router.delete("/:userId/:homeownerId/:projectId", verifyUser, verifyHomeowner, deleteProject)


export default router
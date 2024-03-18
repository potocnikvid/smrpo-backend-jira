"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_controller_1 = require("../controllers/project.controller");
const jwt_guard_1 = require("../guards/jwt-guard");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - documentation
 *         - owner_id
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the project
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         documentation:
 *           type: string
 *           description: Documentation URL or text for the project
 *         owner_id:
 *           type: string
 *           description: The user ID of the project owner
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the project was created
 *
 *     ProjectCreateRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - owner_id
 *         - scrum_master
 *         - developers
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         owner_id:
 *           type: string
 *           description: The user ID of the project owner
 *         scrum_master:
 *           type: string
 *           description: The user ID of the scrum master
 *         developers:
 *           type: array
 *           items:
 *             type: string
 *             description: The user IDs of the developers
 *
 *     ProjectUpdateRequest:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - documentation
 *         - owner_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *         description:
 *           type: string
 *           description: Description of the project
 *         documentation:
 *           type: string
 *           documentation: Documentation of the project
 *
 *
 */
/**
 * @swagger
 * /api/project/get-all:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: Projects not found
 *       500:
 *         description: Unauthorized
 */
router.get("/get-all", jwt_guard_1.jwtGuard, project_controller_1.ProjectController.getProjects);
/**
 * @swagger
 * /api/project/get/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get a project by ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: The project description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error getting project
 */
router.get("/get/:id", jwt_guard_1.jwtGuard, project_controller_1.ProjectController.getProject);
/**
 * @swagger
 * /api/project/create:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectCreateRequest'
 *     responses:
 *       200:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error creating project
 */
router.post("/create", jwt_guard_1.jwtGuard, project_controller_1.ProjectController.createProject);
/**
 * @swagger
 * /api/project/update/{id}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Update a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateRequest'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error updating project
 */
router.put("/update/:id", jwt_guard_1.jwtGuard, project_controller_1.ProjectController.updateProject);
/**
 * @swagger
 * /api/project/delete/{id}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Error deleting project
 */
router.delete('/delete/:id', jwt_guard_1.jwtGuard, project_controller_1.ProjectController.deleteProject);
exports.default = router;

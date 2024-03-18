import express from 'express';
import { SprintController } from '../controllers/sprint.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sprint
 *   description: Sprint management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sprint:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - start_date
 *         - end_date
 *         - velocity
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the sprint
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: The project ID of the sprint
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the sprint starts
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the sprint ends
 *         velocity:
 *           type: integer
 *           format: int64
 *           description: The velocity of the sprint
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the sprint was created
 */

// Swagger documentation for the getCurrentSprint route
/**
 * @swagger
 * /api/sprint/current/{projectId}:
 *   get:
 *     summary: Get the current sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The project ID of the sprint
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The current sprint
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

// Get current sprint route
router.get('/current/:projectId', jwtGuard, SprintController.getCurrentSprint);

// Swagger documentation for the getSprints route
/**
 * @swagger
 * /api/sprint/get-by-project-id/{projectId}:
 *   get:
 *     summary: Get sprints by project ID
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         description: The project ID of the sprint
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of sprints
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprints or projects not found
 *       500:
 *         description: Internal server error
 */

// Get sprints route by project ID route
router.get('/get-by-project-id/:projectId', jwtGuard, SprintController.getSprints);

// Swagger documentation for the getSprint route
/**
 * @swagger
 * /api/sprint/get-by-sprint-id/{id}:
 *   get:
 *     summary: Get a sprint by ID
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The sprint ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The sprint description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

// Get sprint by sprint Id route
router.get('/get-by-sprint-id/:id', jwtGuard, SprintController.getSprint);

// Swagger documentation for the createSprint route
/**
 * @swagger
 * /api/sprint/create:
 *   post:
 *     summary: Create a sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               velocity:
 *                 type: integer
 *                 description: The velocity of the sprint
 *               project_id:
 *                 type: integer
 *                 description: The project ID of the sprint
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the sprint starts
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the sprint ends
 *     responses:
 *       200:
 *         description: The created sprint
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       500:
 *         description: Internal server error
 */

// Create sprint route
router.post('/create', jwtGuard, SprintController.createSprint);

// Swagger documentation for the updateSprint route
/**
 * @swagger
 * /api/sprint/update/{id}:
 *   put:
 *     summary: Update a sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The sprint ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               velocity:
 *                 type: integer
 *                 description: The velocity of the sprint
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the sprint starts
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the sprint ends
 *     responses:
 *       200:
 *         description: The updated sprint
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

// Update sprint route
router.put('/update/:id', jwtGuard, SprintController.updateSprint);

// Swagger documentation for the deleteSprint route
/**
 * @swagger
 * /api/sprint/delete/{id}:
 *   delete:
 *     summary: Delete a sprint
 *     tags: [Sprint]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The sprint ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The deleted sprint
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sprint'
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */

// delete sprint route
router.delete('/delete/:id', jwtGuard, SprintController.deleteSprint);


export default router;

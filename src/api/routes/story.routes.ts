import express from 'express';
import { StoryController} from '../controllers/story.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Story
 *   description: Sprint management
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     StoryStatus:
 *       type: string
 *       enum:
 *         - PRODUCT
 *         - SPRINT
 *         - DONE
 *       description: The current status of the story
 * 
 *     StoryPriority:
 *       type: string
 *       enum:
 *         - NULL
 *         - COULD_HAVE
 *         - SHOULD_HAVE
 *         - MUST_HAVE
 *         - WONT_HAVE_THIS_TIME
 *       description: The priority level of the story
 * 
 *     StoryModel:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - sprint_id
 *         - name
 *         - description
 *         - priority
 *         - business_value
 *         - point_estimation
 *         - status
 *         - acceptance_criteria
 *         - rejected_comment
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the story
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the project to which the story belongs
 *         sprint_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the sprint to which the story is assigned
 *         name:
 *           type: string
 *           description: Name of the story
 *         description:
 *           type: string
 *           description: Detailed description of the story
 *         priority:
 *           $ref: '#/components/schemas/StoryPriority'
 *         business_value:
 *           type: integer
 *           format: int32
 *           description: Business value of the story
 *         point_estimation:
 *           type: integer
 *           format: int32
 *           description: Estimation of effort required to complete the story, in points
 *         status:
 *           $ref: '#/components/schemas/StoryStatus'
 *         acceptance_criteria:
 *           type: string
 *           description: Criteria that must be met for the story to be considered complete
 *         rejected_comment:
 *           type: string
 *           description: Reason for the story's rejection, if applicable
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the story was created
 * 
 *     StoryCreateRequest:
 *       type: object
 *       required:
 *         - project_id
 *         - name
 *         - description
 *         - priority
 *         - business_value
 *         - point_estimation
 *         - acceptance_criteria
 *       properties:
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the project to which the story belongs
 *         name:
 *           type: string
 *           description: Name of the story
 *         description:
 *           type: string
 *           description: Detailed description of the story
 *         priority:
 *           $ref: '#/components/schemas/StoryPriority'
 *         business_value:
 *           type: integer
 *           format: int32
 *           description: Business value of the story
 *         point_estimation:
 *           type: integer
 *           format: int32
 *           description: Estimation of effort required to complete the story, in points
 *         acceptance_criteria:
 *           type: string
 *           description: Criteria that must be met for the story to be considered complete
 * 
 *     StoryUpdateRequest:
 *       type: object
 *       required:
 *         - sprint_id
 *         - name
 *         - description
 *         - priority
 *         - business_value
 *         - point_estimation
 *         - status
 *         - acceptance_criteria
 *         - rejected_comment
 *       properties:
 *         sprint_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the sprint to which the story is assigned
 *         name:
 *           type: string
 *           description: Name of the story
 *         description:
 *           type: string
 *           description: Detailed description of the story
 *         priority:
 *           $ref: '#/components/schemas/StoryPriority'
 *         business_value:
 *           type: integer
 *           format: int32
 *           description: Business value of the story
 *         point_estimation:
 *           type: integer
 *           format: int32
 *           description: Estimation of effort required to complete the story, in points
 *         status:
 *           $ref: '#/components/schemas/StoryStatus'
 *         acceptance_criteria:
 *           type: string
 *           description: Criteria that must be met for the story to be considered complete
 *         rejected_comment:
 *           type: string
 *           description: Reason for the story's rejection, if applicable
 */




/**
 * @swagger
 * /api/story/get-all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all stories
 *     tags: [Story]
 *     responses:
 *       200:
 *         description: A list of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoryModel'
 *       500:
 *         description: Internal server error
 */
router.get('/get-all', jwtGuard, StoryController.getStories);

/**
 * @swagger
 * /api/story/get-by-project/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get stories by project ID
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Project ID
 *     responses:
 *       200:
 *         description: A list of stories for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoryModel'
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-project/:id', jwtGuard, StoryController.getStoriesByProject);

/**
 * @swagger
 * /api/story/get-by-sprint/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get stories by sprint ID
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Sprint ID
 *     responses:
 *       200:
 *         description: A list of stories for the sprint
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoryModel'
 *       404:
 *         description: Sprint not found
 *       500:
 *         description: Internal server error
 */
router.get('/get-by-sprint/:id', jwtGuard, StoryController.getStoriesBySprint);

/**
 * @swagger
 * /api/story/get/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a specific story by ID
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Story ID
 *     responses:
 *       200:
 *         description: Story details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoryModel'
 *       404:
 *         description: Story not found
 *       500:
 *         description: Internal server error
 */
router.get('/get/:id', jwtGuard, StoryController.getStory);

/**
 * @swagger
 * /api/story/create:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new story
 *     tags: [Story]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoryCreateRequest'
 *     responses:
 *       200:
 *         description: Story created successfully
 *       404:
 *         description: Invalid project or sprint
 *       500:
 *         description: Error creating a story
 */

router.post('/create', jwtGuard, StoryController.createStory);


/**
 * @swagger
 * /api/story/update/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an existing story
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Story ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoryUpdateRequest'
 *     responses:
 *       200:
 *         description: Story updated successfully
 *       404:
 *         description: Story not found
 *       500:
 *         description: Error updating the story
 */
router.put('/update/:id', jwtGuard, StoryController.updateStory);


/**
 * @swagger
 * /api/story/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a story
 *     tags: [Story]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Story ID
 *     responses:
 *       200:
 *         description: Story deleted successfully
 *       404:
 *         description: Story not found
 *       500:
 *         description: Error deleting the story
 */
router.delete('/delete/:id', jwtGuard, StoryController.deleteStory);






export default router;

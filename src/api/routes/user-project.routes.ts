import express from 'express';
import { UserProjectController } from '../controllers/user-project.controller';
import { jwtGuard } from '../guards/jwt-guard';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User - Project
 *   description: Management of user-project relationships
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - username
 *         - first_name
 *         - last_name
 *         - is_admin
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         is_admin:
 *           type: boolean
 *           description: Is the user an admin
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         last_login:
 *           type: string
 *           format: date-time
 *           description: The date the user was last logged in
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
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectRole:
 *       type: string
 *       enum:
 *         - NULL
 *         - OWNER
 *         - DEVELOPER
 *         - SCRUM_MASTER
 *         - PRODUCT_OWNER
 *       description: The role of the user in the project
 *     UserProject:
 *       type: object
 *       required:
 *         - id
 *         - project_id
 *         - user_id
 *         - role
 *         - created_at
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Unique identifier for the user-project relation
 *         project_id:
 *           type: integer
 *           format: int64
 *           description: Identifier of the project
 *         user_id:
 *           type: string
 *           description: Identifier of the user
 *         role:
 *           $ref: '#/components/schemas/ProjectRole'
 *           description: Role of the user in the project
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user-project relation was created
 * 
 *     UsersOnProjectReturn:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserModel'
 *           description: User involved in the project
 *         roles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProjectRole'
 *           description: Role of the user in the project
 *       description: Object representing a user and their role on a specific project
 * 
 *     ProjectsByUserReturn:
 *       type: object
 *       properties:
 *         project:
 *           $ref: '#/components/schemas/ProjectModel'
 *           description: Project associated with the user
 *         role:
 *           $ref: '#/components/schemas/ProjectRole'
 *           description: Role of the user in the project
 *       description: Object representing a project and the user's role within it
 */


/**
 * @swagger
 * /api/user-project/get-user-project:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Get user - project relation
 *     tags: [User - Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Identifier of the user
 *               project_id:
 *                 type: integer
 *                 format: int64
 *                 description: Identifier of the project
 *     responses:
 *       200:
 *         description: User - Project relation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProject'
 *       404:
 *         description: Invalid user or project
 *       500:
 *         description: Internal server error
 */
router.post('/get-user-project', jwtGuard, UserProjectController.getUserProject);

/**
 * @swagger
 * /api/user-project/get-project-users/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get users by project ID
 *     tags: [User - Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Identifier of the project
 *     responses:
 *       200:
 *         description: User - Project relations found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UsersOnProjectReturn'
 *       404:
 *         description: Invalid project
 *       500:
 *         description: Internal server error
 */
router.get('/get-project-users/:id', jwtGuard, UserProjectController.getUsersByProject);

/**
 * @swagger
 * /api/user-project/get-user-projects/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get projects by user ID
 *     tags: [User - Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifier of the user
 *     responses:
 *       200:
 *         description: User - Project relations found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectsByUserReturn'
 *       404:
 *         description: Invalid user
 *       500:
 *         description: Internal server error
 */
router.get('/get-user-projects/:id', jwtGuard, UserProjectController.getProjectsByUser);

/**
 * @swagger
 * /api/user-project/add:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Add a user to a project
 *     tags: [User - Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Identifier of the user
 *               project_id:
 *                 type: integer
 *                 format: int64
 *                 description: Identifier of the project
 *               role:
 *                 $ref: '#/components/schemas/ProjectRole'
 *                 description: Role of the user in the project (optional)
 *     responses:
 *       200:
 *         description: User added to project successfully
 *       404:
 *         description: Invalid user or project
 *       500:
 *         description: Internal server error
 */

router.post('/add', jwtGuard, UserProjectController.addUserToProject);

/**
 * @swagger
 * /api/user-project/remove:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Remove a user from a project
 *     tags: [User - Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Identifier of the user
 *               project_id:
 *                 type: integer
 *                 format: int64
 *                 description: Identifier of the project
 *     responses:
 *       200:
 *         description: User removed from project successfully
 *       404:
 *         description: Invalid user or project
 *       500:
 *         description: Internal server error
 */
router.delete('/remove', jwtGuard, UserProjectController.removeUserFromProject);


/**
 * @swagger
 * /api/user-project/set-role:
 *   patch:
 *     security:
 *       - Authorization: []
 *     summary: Set the role of a user in a project
 *     tags: [User - Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: Identifier of the user
 *               project_id:
 *                 type: integer
 *                 format: int64
 *                 description: Identifier of the project
 *               role:
 *                 $ref: '#/components/schemas/ProjectRole'
 *                 description: Role of the user in the project
 *     responses:
 *       200:
 *         description: User role in project updated successfully
 *       404:
 *         description: Invalid user or project
 *       500:
 *         description: Internal server error
 */
router.patch('/set-role', jwtGuard, UserProjectController.setUserRoleInProject);


export default router;

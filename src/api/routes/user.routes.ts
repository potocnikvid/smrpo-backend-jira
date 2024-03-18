import express from "express";
import { UserController } from "../controllers/user.controller";
import { jwtGuard } from "../guards/jwt-guard";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
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
 * 
 *     UserUpdateRequest:
 *       type: object
 *       required:
 *         - username
 *         - first_name
 *         - last_name
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 */


/**
 * @swagger
 * /api/user/get-all:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */
router.get("/get-all", jwtGuard, UserController.getUsers);


/**
 * @swagger
 * /api/user/get/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 */
router.get("/get/:id", jwtGuard, UserController.getUserById);

/**
 * @swagger
 * /api/user/get:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Get a user by Email
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user
 *     responses:
 *       200:
 *         description: The user was found 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 */
router.post("/get", jwtGuard, UserController.getUserByEmail);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Update a user's information
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateRequest'
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", jwtGuard, UserController.updateUser);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Delete a user account
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', jwtGuard, UserController.deleteUser);

/**
 * @swagger
 * /api/user/update-last-login/{id}:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Update a user's last login
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 */
router.post("/update-last-login/:id", jwtGuard, UserController.updateLastLogin);


/**
 * @swagger
 * /api/user/set-role/{id}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Update a user's role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_admin:
 *                 type: boolean
 *                 description: The role of the user
 *     responses:
 *       200:
 *         description: The user was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Internal server error
 */
router.put("/set-role/:id", jwtGuard, UserController.setRole);

export default router;


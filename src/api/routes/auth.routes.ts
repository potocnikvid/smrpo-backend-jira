import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { jwtGuard } from '../guards/jwt-guard';
import { roleAdminGuard } from '../guards/role-admin-guard';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *         access_token:
 *           type: string
 *         refresh_token:
 *           type: string
 *     UserSignupResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserLoginResponse'
 */


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', jwtGuard, AuthController.login);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *               - first_name
 *               - last_name
 *               - is_admin
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               first_name:
 *                 type: string
 *                 description: The first name of the user
 *               last_name:
 *                 type: string
 *                 description: The last name of the user
 *               is_admin:
 *                 type: boolean
 *                 description: Is the user an admin
 *     responses:
 *       200:
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignupResponse'
 *       400:
 *         description: Error signing up
 *       500:
 *         description: Internal server error
 */
router.post('/signup', jwtGuard, AuthController.signup);


/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Refresh a user's access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refresh_token
 *             properties:
 *               refresh_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResponse'
 *       400:
 *         description: Error refreshing token
 *       500:
 *         description: Internal server error
 * 
 */
router.post('/refresh-token', AuthController.refreshToken);

/**
 * @swagger
 * /api/auth/change-password/{id}:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Change a user's password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/change-password/:id', [jwtGuard, roleAdminGuard], AuthController.changePasswordAdmin);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Change user's own password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *               confirmPassword:
 *                type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/change-password', jwtGuard, AuthController.changePassword);


/**
 * @swagger
 * /api/auth/delete-user/{id}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Delete a user's account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete-user/:id', [jwtGuard, roleAdminGuard], AuthController.deleteUserAdmin);

/**
 * @swagger
 * /api/auth/delete-user:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Delete user's own account
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete-user', jwtGuard, AuthController.deleteUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Log out a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - access_token
 *             properties:
 *               access_token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful logout
 *       400:
 *         description: Error logging out
 *       500:
 *         description: Internal server error
 */
router.post('/logout', jwtGuard, AuthController.logout);

export default router;

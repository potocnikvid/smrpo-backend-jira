import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { UserService } from '../services/user.service';


export class UserController {
    public static async getUsers(req: Request, res: Response) {
        try {
            const response = await UserService.getUsers();
            if (response) {
                logger.log('info', 'api-UserController-getUsers() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-UserController-getUsers() | Error | No users found')
                res.status(404).send({error: 'No users found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-getUsers() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = await UserService.getUserById(id);
            if (response) {
                logger.log('info', 'api-UserController-getUserById() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-UserController-getUserById() | Error | User not found')
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-getUserById() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getUserByEmail(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const response = await UserService.getUserByEmail(email);
            if (response) {
                logger.log('info', 'api-UserController-getUserByEmail() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-UserController-getUserByEmail() | Error | User not found')
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-getUserByEmail() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { username, first_name, last_name } = req.body;
            const user = await UserService.getUserById(id);
            if (user) {
                const response = await UserService.updateUser(id, username, first_name, last_name);
                if (response) {
                    logger.log('info', 'api-UserController-updateUser() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error updating user');
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-updateUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            if (user) {
                const response = await UserService.deleteUser(id);
                if (response) {
                    logger.log('info', 'api-UserController-deleteUser() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error deleting user');
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-deleteUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateLastLogin(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            if (user) {
                const response = await UserService.updateLastLogin(id);
                if (response) {
                    logger.log('info', 'api-UserController-updateLastLogin() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error updating last login');
                }
                logger.log('info', 'api-UserController-updateLastLogin() | SUCCESS')
                res.status(200).send(response);
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-updateLastLogin() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async setRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { is_admin } = req.body;
            const user = await UserService.getUserById(id);
            if (user) {
                const response = await UserService.setRole(id, is_admin);
                if (response) {
                    logger.log('info', 'api-UserController-setRole() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error setting role');
                }
            } else {
                res.status(404).send({error: 'User not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserController-setRole() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}
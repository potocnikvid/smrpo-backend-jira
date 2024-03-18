import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { UserProjectService } from '../services/user-project.service';
import { UsersOnProjectReturn } from '../models/user-project.model';

export class UserProjectController {
    static async getUserProject(req: Request, res: Response) {
        try {
            const { user_id, project_id } = req.body;
            const validUser = await UserService.getUserById(user_id);
            const validProject = await ProjectService.getProjectById(project_id);
            if (validProject && validUser) {
                const response = await UserProjectService.getUserProject(user_id, project_id);
                if (response) {
                    logger.log('info', 'api-UserProjectController-getUserProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error getting user project');
                }
            } else {
                logger.log('error', 'api-UserProjectController-getUserProject() | Error | Invalid user or project')
                res.status(404).send({error: 'Invalid user or project'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-getUserProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    static async getUsersByProject(req: Request, res: Response) {
        try {
            const project_id  = parseInt(req.params.id);
            const validProject = await ProjectService.getProjectById(project_id);
            if (validProject) {
                const response = await UserProjectService.getUsersByProject(validProject.id);
                if (response) {
                    logger.log('info', 'api-UserProjectController-getUsersByProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error getting users by project');
                }
            } else {
                logger.log('error', 'api-UserProjectController-getUsersByProject() | Error | Invalid project')
                res.status(404).send({error: 'Invalid project'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-getUsersByProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    static async getProjectsByUser(req: Request, res: Response) {
        try {
            const user_id = req.params.id;
            const validUser = await UserService.getUserById(user_id);
            if (validUser) {
                const response = await UserProjectService.getProjectsByUser(validUser.id);
                if (response) {
                    logger.log('info', 'api-UserProjectController-getProjectsByUser() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error getting projects by user');
                }
            } else {
                logger.log('error', 'api-UserProjectController-getProjectsByUser() | Error | Invalid user')
                res.status(404).send({error: 'Invalid user'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-getProjectsByUser() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    static async addUserToProject(req: Request, res: Response) {
        try {
            const { user_id, project_id, role } = req.body;
            const validUser = await UserService.getUserById(user_id);
            const validProject = await ProjectService.getProjectById(project_id);
            if (validProject && validUser) {
                const response = await UserProjectService.addUserToProject(validUser.id, validProject.id, role);
                if (response) {
                    logger.log('info', 'api-UserProjectController-addUserToProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error adding user to project');
                }
            } else {
                logger.log('error', 'api-UserProjectController-addUserToProject() | Error | Invalid user or project')
                res.status(404).send({error: 'Invalid user or project'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-addUserToProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    static async removeUserFromProject(req: Request, res: Response) {
        try {
            const { user_id, project_id } = req.body;
            const validUser = await UserService.getUserById(user_id);
            const validProject = await ProjectService.getProjectById(project_id);
            if (validProject && validUser) {
                const response = await UserProjectService.removeUserFromProject(validUser.id, validProject.id);
                if (response) {
                    logger.log('info', 'api-UserProjectController-removeUserFromProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error removing user from project');
                }
            } else {
                logger.log('error', 'api-UserProjectController-removeUserFromProject() | Error | Invalid user or project')
                res.status(404).send({error: 'Invalid user or project'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-removeUserFromProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    static async setUserRoleInProject(req: Request, res: Response) {
        try {
            const { user_id, project_id, role } = req.body;
            const validUser = await UserService.getUserById(user_id);
            const validProject = await ProjectService.getProjectById(project_id);
            if (validProject && validUser) {
                const response = await UserProjectService.setUserRoleInProject(validUser.id, validProject.id, role);
                if (response) {
                    logger.log('info', 'api-UserProjectController-setUserRoleInProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error setting user role in project');
                }
            } else {
                logger.log('error', 'api-UserProjectController-setUserRoleInProject() | Error | Invalid user or project')
                res.status(404).send({error: 'Invalid user or project'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-UserProjectController-setUserRoleInProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}
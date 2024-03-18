import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/project.model';
import { UserService } from '../services/user.service';
import { UserProjectService } from '../services/user-project.service';
import { ProjectRole } from '../models/user-project.model';

export class ProjectController {
    public static async getProjects(req: Request, res: Response) {
        try {
            const response = await ProjectService.getProjects();
            if (response) {
                logger.log('info', 'api-ProjectController-getProjects() | SUCCESS')
                res.status(200).send(response);
            } else {
                throw new Error('Error getting projects');
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-getProjects() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getProject(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await ProjectService.getProjectById(id);
            if (response) {
                logger.log('info', 'api-ProjectController-getProject() | SUCCESS')
                res.status(200).send(response);
            } else {
                throw new Error('Error getting project');
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-getProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createProject(req: Request, res: Response) {
        try {
            const { name, description, owner_id, scrum_master, developers} = req.body;
            const owner = await UserService.getUserById(owner_id);
            if (owner && owner.id === owner_id) {
                const response = await ProjectService.createProject(name, description, owner_id);
                if (response) {
                    logger.log('info', 'api-ProjectController-createProject() | SUCCESS')
                    const userProject = await UserProjectService.addUserToProject(owner_id, response.id, ProjectRole.OWNER);
                    if (userProject) {
                        for (let i = 0; i < developers.length; i++) {
                            const dev = await UserService.getUserById(developers[i]);
                            if (dev) {
                                const userProject = await UserProjectService.addUserToProject(dev.id, response.id, ProjectRole.DEVELOPER);
                                if (!userProject) {
                                    throw new Error('Error adding developer to project');
                                }
                            } else {
                                throw new Error('Error adding developer to project');
                            }
                        }
                        const userProject = await UserProjectService.addUserToProject(scrum_master, response.id, ProjectRole.SCRUM_MASTER);
                        if (!userProject) {
                            throw new Error('Error adding scrum master to project');
                        }
                    } else {
                        throw new Error('Error adding owner to project');
                    }
                    res.status(200).send(response);
                } else {
                    throw new Error('Error creating a project');
                }
            } else {
                res.status(404).send({error: 'User not found'});
                return;
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-createProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateProject(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { name, description, documentation } = req.body;
            const project = await ProjectService.getProjectById(id);
            if (project) {
                const response = await ProjectService.updateProject(project.id, name, description, documentation);
                if (response) {
                    logger.log('info', 'api-ProjectController-updateProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error updating project');
                }
            } else {
                res.status(404).send({error: 'Project not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-updateProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteProject(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const project = await ProjectService.getProjectById(id);
            if (project) {
                const response = await ProjectService.deleteProject(id);
                if (response) {
                    logger.log('info', 'api-ProjectController-deleteProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error deleting project');
                }
            } else {
                res.status(404).send({error: 'Project not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-ProjectController-deleteProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}
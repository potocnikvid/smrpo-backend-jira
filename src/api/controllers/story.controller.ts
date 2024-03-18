import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { SprintService } from '../services/sprint.service';
import { SprintModel } from '../models/sprint.model';
import { ProjectService } from '../services/project.service';
import { StoryCreateRequest, StoryModel, StoryUpdateRequest } from '../models/story.model';
import { StoryService } from '../services/story.service';

export class StoryController {
    public static async getStories(req: Request, res: Response) {
        try {
            const response = await StoryService.getStories();
            if (response) {
                logger.log('info', 'api-StoryController-getStories() | SUCCESS')
                res.status(200).send(response);
            } else {
                throw new Error('Error getting stories');
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-getStories() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getStoriesByProject(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const validProject = await ProjectService.getProjectById(id);
            if (!validProject) {
                logger.log('error', 'api-StoryController-getStoriesByProject() | Error | Project not found')
                res.status(404).send({error: 'Project not found'});
            } else {
                const response = await StoryService.getStoriesByProject(validProject.id);
                if (response) {
                    logger.log('info', 'api-StoryController-getStoriesByProject() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error getting stories');
                }
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-getStoriesByProject() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getStoriesBySprint(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const validSprint = await SprintService.getSprintById(id);
            if (!validSprint) {
                logger.log('error', 'api-StoryController-getStoriesBySprint() | Error | Sprint not found')
                res.status(404).send({error: 'Sprint not found'});
            } else {
                const response = await StoryService.getStoriesBySprint(id);
                if (response) {
                    logger.log('info', 'api-StoryController-getStoriesBySprint() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error getting stories');
                }
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-getStoriesBySprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getStory(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await StoryService.getStoryById(id);
            if (response) {
                logger.log('info', 'api-StoryController-getStory() | SUCCESS')
                res.status(200).send(response);
            } else {
                throw new Error('Error getting story');
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-getStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createStory(req: Request, res: Response) {
        try {
            const params: StoryCreateRequest = req.body;
            const validProject = await ProjectService.getProjectById(params.project_id);
            if (!validProject) {
                res.status(404).send({error: 'Project not found'});
                return;
            }
            if (validProject) {
                const response = await StoryService.createStory(params);
                if (response) {
                    logger.log('info', 'api-StoryController-createStory() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error creating a story');
                }
            } else {
                res.status(404).send({error: 'Invalid project or sprint'});
                return
            }

        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-createStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateStory(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const params: StoryUpdateRequest = req.body;
            const validStory = await StoryService.getStoryById(id);
            if (validStory) {
                const response = await StoryService.updateStory(id, params);
                if (response) {
                    logger.log('info', 'api-StoryController-updateStory() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error updating a story');
                }
            } else {
                res.status(404).send({error: 'Story not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-updateStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteStory(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const validStory = await StoryService.getStoryById(id);
            if (validStory) {
                const response = await StoryService.deleteStory(id);
                if (response) {
                    logger.log('info', 'api-StoryController-deleteStory() | SUCCESS')
                    res.status(200).send(response);
                } else {
                    throw new Error('Error deleting a story');
                }
            } else {
                res.status(404).send({error: 'Story not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-StoryController-deleteStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}
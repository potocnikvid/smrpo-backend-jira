import logger from '../../utils/winston-logger';
import { Request, Response } from 'express'
import { SprintService } from '../services/sprint.service';
import { SprintModel } from '../models/sprint.model';
import { ProjectService } from '../services/project.service';
import { StoryCreateRequest, StoryModel, StoryUpdateRequest } from '../models/story.model';
import { StoryService } from '../services/story.service';
import { TaskModel, TaskStatus, TaskWithAssigneeInfo } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

export class TaskController {
    public static async getTasksByStory(req: Request, res: Response) {
        try {
            const storyId = parseInt(req.params.story_id);
            const story = await StoryService.getStoryById(storyId);
            if (!story) {
                logger.log('error', 'api-TaskController-getTasksByStory() | Error | Story not found')
                res.status(404).send({error: 'Story not found'});
                return;
            }
            const response = await TaskService.getTasksByStory(storyId);
            if (response) {
                let tasksWithAssigneeInfo: TaskWithAssigneeInfo[] = [];
                for (let i = 0; i < response.length; i++) {
                    const task = response[i];
                    if (!task.assignee_id) {
                        tasksWithAssigneeInfo.push({
                            task: task,
                            assignee: null
                        });
                    } else {
                        const assignee = await UserService.getUserById(task.assignee_id);
                        if (!assignee) {
                            logger.log('error', 'api-TaskController-getTasksByStory() | Error | Assignee not found')
                            res.status(404).send({error: `Assignee not found for task ${task.id}`});
                            return;
                        }
                        tasksWithAssigneeInfo.push({
                            task: task,
                            assignee: assignee
                        });
                    }
                }
                logger.log('info', 'api-TaskController-getTasksByStory() | SUCCESS')
                res.status(200).send(tasksWithAssigneeInfo);
            } else {
                logger.log('info', 'api-TaskController-getTasksByStory() | SUCCESS | No tasks found')
                res.status(404).send({error: 'No tasks found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-getTasksByStory() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTasksByAssignee(req: Request, res: Response) {
        try {
            const assigneeId = req.params.assignee_id;
            const assignee = await UserService.getUserById(assigneeId);
            if (!assignee) {
                logger.log('error', 'api-TaskController-getTasksByAssignee() | Error | Assignee not found')
                res.status(404).send({error: 'Assignee not found'});
                return;
            }
            const response = await TaskService.getTasksByAssignee(assigneeId);
            if (response) {
                logger.log('info', 'api-TaskController-getTasksByAssignee() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-TaskController-getTasksByAssignee() | SUCCESS | No tasks found')
                res.status(404).send({error: 'No tasks found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-getTasksByAssignee() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTaskBySprint(req: Request, res: Response) {
        try {
            const sprintId = parseInt(req.params.sprint_id);
            const sprint = await SprintService.getSprintById(sprintId);
            if (!sprint) {
                logger.log('error', 'api-TaskController-getTaskBySprint() | Error | Sprint not found')
                res.status(404).send({error: 'Sprint not found'});
                return;
            }
            const response = await TaskService.getTaskBySprint(sprintId);
            if (response) {
                logger.log('info', 'api-TaskController-getTaskBySprint() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-TaskController-getTaskBySprint() | SUCCESS | No tasks found')
                res.status(404).send({error: 'No tasks found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-getTaskBySprint() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async getTask(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const response = await TaskService.getTaskById(id);
            if (response) {
                logger.log('info', 'api-TaskController-getTask() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-TaskController-getTask() | SUCCESS | Task not found')
                res.status(404).send({error: 'Task not found'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-getTask() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async createTask(req: Request, res: Response) {
        try {
            const { story_id, time_estimation, description, assignee_id } = req.body;
            const story = await StoryService.getStoryById(story_id);
            if (!story) {
                logger.log('error', 'api-TaskController-createTask() | Error | Story not found')
                res.status(404).send({error: 'Story not found'});
                return;
            }
            let response: TaskModel | null;
            if (!assignee_id) {
                response = await TaskService.createTask(story_id, time_estimation, description, null, null);
            } else {
                const assignee = await UserService.getUserById(assignee_id);
                if (!assignee) {
                    logger.log('error', 'api-TaskController-createTask() | Error | Assignee not found')
                    res.status(404).send({error: 'Assignee not found'});
                    return;
                }
                response = await TaskService.createTask(story_id, time_estimation, description, assignee_id, TaskStatus.PENDING);
            }
            if (response) {
                logger.log('info', 'api-TaskController-createTask() | SUCCESS')
                res.status(201).send(response);
            } else {
                logger.log('info', 'api-TaskController-createTask() | SUCCESS | Task not created')
                res.status(500).send({error: 'Task not created'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-createTask() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async updateTask(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { time_estimation, time_needed, description, status, assignee_id } = req.body;
            const task = await TaskService.getTaskById(id);
            if (!task) {
                logger.log('error', 'api-TaskController-updateTask() | Error | Task not found')
                res.status(404).send({error: 'Task not found'});
                return;
            }
            if (assignee_id) {
                const assignee = await UserService.getUserById(assignee_id);
                if (!assignee) {
                    logger.log('error', 'api-TaskController-updateTask() | Error | Assignee not found')
                    res.status(404).send({error: 'Assignee not found'});
                    return;
                }
            }
            if (status === TaskStatus.PENDING && !assignee_id) {
                logger.log('error', 'api-TaskController-updateTask() | Error | Assignee required for pending task')
                res.status(400).send({error: 'Assignee required for pending task'});
                return;
            }
            const response = await TaskService.updateTask(id, time_estimation, time_needed, description, status, assignee_id);
            if (response) {
                logger.log('info', 'api-TaskController-updateTask() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-TaskController-updateTask() | SUCCESS | Task not updated')
                res.status(500).send({error: 'Task not updated'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-updateTask() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
    public static async deleteTask(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const task = await TaskService.getTaskById(id);
            if (!task) {
                logger.log('error', 'api-TaskController-deleteTask() | Error | Task not found')
                res.status(404).send({error: 'Task not found'});
                return;
            }
            const response = await TaskService.deleteTask(id);
            if (response) {
                logger.log('info', 'api-TaskController-deleteTask() | SUCCESS')
                res.status(200).send(response);
            } else {
                logger.log('info', 'api-TaskController-deleteTask() | SUCCESS | Task not deleted')
                res.status(500).send({error: 'Task not deleted'});
            }
        } catch (e: unknown) {
            const typedE = e as Error
            logger.log('error', 'api-TaskController-deleteTask() | Error | ' + String(typedE.message))
            res.status(500).send({error: typedE.message});
        }
    }
}
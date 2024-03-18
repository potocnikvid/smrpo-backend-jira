"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const sprint_service_1 = require("../services/sprint.service");
const story_service_1 = require("../services/story.service");
const task_model_1 = require("../models/task.model");
const task_service_1 = require("../services/task.service");
const user_service_1 = require("../services/user.service");
class TaskController {
    static getTasksByStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storyId = parseInt(req.params.story_id);
                const story = yield story_service_1.StoryService.getStoryById(storyId);
                if (!story) {
                    winston_logger_1.default.log('error', 'api-TaskController-getTasksByStory() | Error | Story not found');
                    res.status(404).send({ error: 'Story not found' });
                    return;
                }
                const response = yield task_service_1.TaskService.getTasksByStory(storyId);
                if (response) {
                    let tasksWithAssigneeInfo = [];
                    for (let i = 0; i < response.length; i++) {
                        const task = response[i];
                        if (!task.assignee_id) {
                            tasksWithAssigneeInfo.push({
                                task: task,
                                assignee: null
                            });
                        }
                        else {
                            const assignee = yield user_service_1.UserService.getUserById(task.assignee_id);
                            if (!assignee) {
                                winston_logger_1.default.log('error', 'api-TaskController-getTasksByStory() | Error | Assignee not found');
                                res.status(404).send({ error: `Assignee not found for task ${task.id}` });
                                return;
                            }
                            tasksWithAssigneeInfo.push({
                                task: task,
                                assignee: assignee
                            });
                        }
                    }
                    winston_logger_1.default.log('info', 'api-TaskController-getTasksByStory() | SUCCESS');
                    res.status(200).send(tasksWithAssigneeInfo);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-getTasksByStory() | SUCCESS | No tasks found');
                    res.status(404).send({ error: 'No tasks found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-getTasksByStory() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getTasksByAssignee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assigneeId = req.params.assignee_id;
                const assignee = yield user_service_1.UserService.getUserById(assigneeId);
                if (!assignee) {
                    winston_logger_1.default.log('error', 'api-TaskController-getTasksByAssignee() | Error | Assignee not found');
                    res.status(404).send({ error: 'Assignee not found' });
                    return;
                }
                const response = yield task_service_1.TaskService.getTasksByAssignee(assigneeId);
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-getTasksByAssignee() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-getTasksByAssignee() | SUCCESS | No tasks found');
                    res.status(404).send({ error: 'No tasks found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-getTasksByAssignee() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getTaskBySprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sprintId = parseInt(req.params.sprint_id);
                const sprint = yield sprint_service_1.SprintService.getSprintById(sprintId);
                if (!sprint) {
                    winston_logger_1.default.log('error', 'api-TaskController-getTaskBySprint() | Error | Sprint not found');
                    res.status(404).send({ error: 'Sprint not found' });
                    return;
                }
                const response = yield task_service_1.TaskService.getTaskBySprint(sprintId);
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-getTaskBySprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-getTaskBySprint() | SUCCESS | No tasks found');
                    res.status(404).send({ error: 'No tasks found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-getTaskBySprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield task_service_1.TaskService.getTaskById(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-getTask() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-getTask() | SUCCESS | Task not found');
                    res.status(404).send({ error: 'Task not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-getTask() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { story_id, time_estimation, description, assignee_id } = req.body;
                const story = yield story_service_1.StoryService.getStoryById(story_id);
                if (!story) {
                    winston_logger_1.default.log('error', 'api-TaskController-createTask() | Error | Story not found');
                    res.status(404).send({ error: 'Story not found' });
                    return;
                }
                let response;
                if (!assignee_id) {
                    response = yield task_service_1.TaskService.createTask(story_id, time_estimation, description, null, null);
                }
                else {
                    const assignee = yield user_service_1.UserService.getUserById(assignee_id);
                    if (!assignee) {
                        winston_logger_1.default.log('error', 'api-TaskController-createTask() | Error | Assignee not found');
                        res.status(404).send({ error: 'Assignee not found' });
                        return;
                    }
                    response = yield task_service_1.TaskService.createTask(story_id, time_estimation, description, assignee_id, task_model_1.TaskStatus.PENDING);
                }
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-createTask() | SUCCESS');
                    res.status(201).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-createTask() | SUCCESS | Task not created');
                    res.status(500).send({ error: 'Task not created' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-createTask() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { time_estimation, time_needed, description, status, assignee_id } = req.body;
                const task = yield task_service_1.TaskService.getTaskById(id);
                if (!task) {
                    winston_logger_1.default.log('error', 'api-TaskController-updateTask() | Error | Task not found');
                    res.status(404).send({ error: 'Task not found' });
                    return;
                }
                if (assignee_id) {
                    const assignee = yield user_service_1.UserService.getUserById(assignee_id);
                    if (!assignee) {
                        winston_logger_1.default.log('error', 'api-TaskController-updateTask() | Error | Assignee not found');
                        res.status(404).send({ error: 'Assignee not found' });
                        return;
                    }
                }
                if (status === task_model_1.TaskStatus.PENDING && !assignee_id) {
                    winston_logger_1.default.log('error', 'api-TaskController-updateTask() | Error | Assignee required for pending task');
                    res.status(400).send({ error: 'Assignee required for pending task' });
                    return;
                }
                const response = yield task_service_1.TaskService.updateTask(id, time_estimation, time_needed, description, status, assignee_id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-updateTask() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-updateTask() | SUCCESS | Task not updated');
                    res.status(500).send({ error: 'Task not updated' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-updateTask() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const task = yield task_service_1.TaskService.getTaskById(id);
                if (!task) {
                    winston_logger_1.default.log('error', 'api-TaskController-deleteTask() | Error | Task not found');
                    res.status(404).send({ error: 'Task not found' });
                    return;
                }
                const response = yield task_service_1.TaskService.deleteTask(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-TaskController-deleteTask() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-TaskController-deleteTask() | SUCCESS | Task not deleted');
                    res.status(500).send({ error: 'Task not deleted' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-TaskController-deleteTask() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.TaskController = TaskController;

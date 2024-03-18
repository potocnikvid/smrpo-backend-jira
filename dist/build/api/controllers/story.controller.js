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
exports.StoryController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const sprint_service_1 = require("../services/sprint.service");
const project_service_1 = require("../services/project.service");
const story_service_1 = require("../services/story.service");
class StoryController {
    static getStories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield story_service_1.StoryService.getStories();
                if (response) {
                    winston_logger_1.default.log('info', 'api-StoryController-getStories() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error getting stories');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-getStories() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getStoriesByProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const validProject = yield project_service_1.ProjectService.getProjectById(id);
                if (!validProject) {
                    winston_logger_1.default.log('error', 'api-StoryController-getStoriesByProject() | Error | Project not found');
                    res.status(404).send({ error: 'Project not found' });
                }
                else {
                    const response = yield story_service_1.StoryService.getStoriesByProject(validProject.id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-StoryController-getStoriesByProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error getting stories');
                    }
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-getStoriesByProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getStoriesBySprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const validSprint = yield sprint_service_1.SprintService.getSprintById(id);
                if (!validSprint) {
                    winston_logger_1.default.log('error', 'api-StoryController-getStoriesBySprint() | Error | Sprint not found');
                    res.status(404).send({ error: 'Sprint not found' });
                }
                else {
                    const response = yield story_service_1.StoryService.getStoriesBySprint(id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-StoryController-getStoriesBySprint() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error getting stories');
                    }
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-getStoriesBySprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield story_service_1.StoryService.getStoryById(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-StoryController-getStory() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error getting story');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-getStory() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static createStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = req.body;
                const validProject = yield project_service_1.ProjectService.getProjectById(params.project_id);
                if (!validProject) {
                    res.status(404).send({ error: 'Project not found' });
                    return;
                }
                if (validProject) {
                    const response = yield story_service_1.StoryService.createStory(params);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-StoryController-createStory() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error creating a story');
                    }
                }
                else {
                    res.status(404).send({ error: 'Invalid project or sprint' });
                    return;
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-createStory() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const params = req.body;
                const validStory = yield story_service_1.StoryService.getStoryById(id);
                if (validStory) {
                    const response = yield story_service_1.StoryService.updateStory(id, params);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-StoryController-updateStory() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error updating a story');
                    }
                }
                else {
                    res.status(404).send({ error: 'Story not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-updateStory() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteStory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const validStory = yield story_service_1.StoryService.getStoryById(id);
                if (validStory) {
                    const response = yield story_service_1.StoryService.deleteStory(id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-StoryController-deleteStory() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error deleting a story');
                    }
                }
                else {
                    res.status(404).send({ error: 'Story not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-StoryController-deleteStory() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.StoryController = StoryController;

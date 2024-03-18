"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const project_service_1 = require("../services/project.service");
const user_service_1 = require("../services/user.service");
const user_project_service_1 = require("../services/user-project.service");
const user_project_model_1 = require("../models/user-project.model");
class ProjectController {
    static getProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield project_service_1.ProjectService.getProjects();
                if (response) {
                    winston_logger_1.default.log('info', 'api-ProjectController-getProjects() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error getting projects');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-ProjectController-getProjects() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield project_service_1.ProjectService.getProjectById(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-ProjectController-getProject() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error getting project');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-ProjectController-getProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, owner_id, scrum_master, developers } = req.body;
                const owner = yield user_service_1.UserService.getUserById(owner_id);
                if (owner && owner.id === owner_id) {
                    const response = yield project_service_1.ProjectService.createProject(name, description, owner_id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-ProjectController-createProject() | SUCCESS');
                        const userProject = yield user_project_service_1.UserProjectService.addUserToProject(owner_id, response.id, user_project_model_1.ProjectRole.OWNER);
                        if (userProject) {
                            for (let i = 0; i < developers.length; i++) {
                                const dev = yield user_service_1.UserService.getUserById(developers[i]);
                                if (dev) {
                                    const userProject = yield user_project_service_1.UserProjectService.addUserToProject(dev.id, response.id, user_project_model_1.ProjectRole.DEVELOPER);
                                    if (!userProject) {
                                        throw new Error('Error adding developer to project');
                                    }
                                }
                                else {
                                    throw new Error('Error adding developer to project');
                                }
                            }
                            const userProject = yield user_project_service_1.UserProjectService.addUserToProject(scrum_master, response.id, user_project_model_1.ProjectRole.SCRUM_MASTER);
                            if (!userProject) {
                                throw new Error('Error adding scrum master to project');
                            }
                        }
                        else {
                            throw new Error('Error adding owner to project');
                        }
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error creating a project');
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                    return;
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-ProjectController-createProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { name, description, documentation } = req.body;
                const project = yield project_service_1.ProjectService.getProjectById(id);
                if (project) {
                    const response = yield project_service_1.ProjectService.updateProject(project.id, name, description, documentation);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-ProjectController-updateProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error updating project');
                    }
                }
                else {
                    res.status(404).send({ error: 'Project not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-ProjectController-updateProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const project = yield project_service_1.ProjectService.getProjectById(id);
                if (project) {
                    const response = yield project_service_1.ProjectService.deleteProject(id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-ProjectController-deleteProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error deleting project');
                    }
                }
                else {
                    res.status(404).send({ error: 'Project not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-ProjectController-deleteProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.ProjectController = ProjectController;

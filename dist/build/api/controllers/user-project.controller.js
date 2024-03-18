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
exports.UserProjectController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const project_service_1 = require("../services/project.service");
const user_service_1 = require("../services/user.service");
const user_project_service_1 = require("../services/user-project.service");
class UserProjectController {
    static getUserProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, project_id } = req.body;
                const validUser = yield user_service_1.UserService.getUserById(user_id);
                const validProject = yield project_service_1.ProjectService.getProjectById(project_id);
                if (validProject && validUser) {
                    const response = yield user_project_service_1.UserProjectService.getUserProject(user_id, project_id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-getUserProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error getting user project');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-getUserProject() | Error | Invalid user or project');
                    res.status(404).send({ error: 'Invalid user or project' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-getUserProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getUsersByProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project_id = parseInt(req.params.id);
                const validProject = yield project_service_1.ProjectService.getProjectById(project_id);
                if (validProject) {
                    const response = yield user_project_service_1.UserProjectService.getUsersByProject(validProject.id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-getUsersByProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error getting users by project');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-getUsersByProject() | Error | Invalid project');
                    res.status(404).send({ error: 'Invalid project' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-getUsersByProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getProjectsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.params.id;
                const validUser = yield user_service_1.UserService.getUserById(user_id);
                if (validUser) {
                    const response = yield user_project_service_1.UserProjectService.getProjectsByUser(validUser.id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-getProjectsByUser() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error getting projects by user');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-getProjectsByUser() | Error | Invalid user');
                    res.status(404).send({ error: 'Invalid user' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-getProjectsByUser() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static addUserToProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, project_id, role } = req.body;
                const validUser = yield user_service_1.UserService.getUserById(user_id);
                const validProject = yield project_service_1.ProjectService.getProjectById(project_id);
                if (validProject && validUser) {
                    const response = yield user_project_service_1.UserProjectService.addUserToProject(validUser.id, validProject.id, role);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-addUserToProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error adding user to project');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-addUserToProject() | Error | Invalid user or project');
                    res.status(404).send({ error: 'Invalid user or project' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-addUserToProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static removeUserFromProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, project_id } = req.body;
                const validUser = yield user_service_1.UserService.getUserById(user_id);
                const validProject = yield project_service_1.ProjectService.getProjectById(project_id);
                if (validProject && validUser) {
                    const response = yield user_project_service_1.UserProjectService.removeUserFromProject(validUser.id, validProject.id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-removeUserFromProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error removing user from project');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-removeUserFromProject() | Error | Invalid user or project');
                    res.status(404).send({ error: 'Invalid user or project' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-removeUserFromProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static setUserRoleInProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id, project_id, role } = req.body;
                const validUser = yield user_service_1.UserService.getUserById(user_id);
                const validProject = yield project_service_1.ProjectService.getProjectById(project_id);
                if (validProject && validUser) {
                    const response = yield user_project_service_1.UserProjectService.setUserRoleInProject(validUser.id, validProject.id, role);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserProjectController-setUserRoleInProject() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error setting user role in project');
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-UserProjectController-setUserRoleInProject() | Error | Invalid user or project');
                    res.status(404).send({ error: 'Invalid user or project' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserProjectController-setUserRoleInProject() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.UserProjectController = UserProjectController;

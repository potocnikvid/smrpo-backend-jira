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
exports.SprintController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const sprint_service_1 = require("../services/sprint.service");
const project_service_1 = require("../services/project.service");
class SprintController {
    static getCurrentSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = parseInt(req.params.projectId);
                const date = new Date();
                const project = yield project_service_1.ProjectService.getProjectById(projectId);
                if (!project) {
                    winston_logger_1.default.log('error', 'api-SprintController-getCurrentSprint() | Error | Project not found');
                    res.status(404).send({ error: 'Project not found' });
                    return;
                }
                const response = yield sprint_service_1.SprintService.getCurrentSprint(projectId, date);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-getCurrentSprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-SprintController-getCurrentSprint() | SUCCESS | No active sprint');
                    res.status(404).send({ error: 'No active sprint' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-getCurrentSprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getSprints(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = parseInt(req.params.projectId);
                const project = yield project_service_1.ProjectService.getProjectById(projectId);
                if (!project) {
                    winston_logger_1.default.log('error', 'api-SprintController-getSprints() | Error | Project not found');
                    res.status(404).send({ error: 'Project not found' });
                    return;
                }
                const response = yield sprint_service_1.SprintService.getSprints(projectId);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-getSprints() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-SprintController-getSprints() | SUCCESS | No sprints found');
                    res.status(404).send({ error: 'Sprint not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-getSprints() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const response = yield sprint_service_1.SprintService.getSprintById(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-getSprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-SprintController-getSprint() | SUCCESS | Sprint not found');
                    res.status(404).send({ error: 'Sprint not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-getSprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static createSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { velocity, project_id, start_date, end_date } = req.body;
                const response = yield sprint_service_1.SprintService.createSprint(velocity, project_id, start_date, end_date);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-createSprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error creating sprint');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-createSprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const sprint = yield sprint_service_1.SprintService.getSprintById(id);
                if (!sprint) {
                    winston_logger_1.default.log('error', 'api-SprintController-updateSprint() | Error | Sprint not found');
                    res.status(404).send({ error: 'Sprint not found' });
                    return;
                }
                const { velocity, start_date, end_date } = req.body;
                const response = yield sprint_service_1.SprintService.updateSprint(id, velocity, start_date, end_date);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-updateSprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error updating sprint');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-updateSprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteSprint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const sprint = yield sprint_service_1.SprintService.getSprintById(id);
                if (!sprint) {
                    winston_logger_1.default.log('error', 'api-SprintController-deleteSprint() | Error | Sprint not found');
                    res.status(404).send({ error: 'Sprint not found' });
                    return;
                }
                const response = yield sprint_service_1.SprintService.deleteSprint(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-SprintController-deleteSprint() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    throw new Error('Error deleting sprint');
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-SprintController-deleteSprint() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.SprintController = SprintController;

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
exports.UserController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const user_service_1 = require("../services/user.service");
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.getUsers();
                if (response) {
                    winston_logger_1.default.log('info', 'api-UserController-getUsers() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-UserController-getUsers() | Error | No users found');
                    res.status(404).send({ error: 'No users found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-getUsers() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield user_service_1.UserService.getUserById(id);
                if (response) {
                    winston_logger_1.default.log('info', 'api-UserController-getUserById() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-UserController-getUserById() | Error | User not found');
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-getUserById() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const response = yield user_service_1.UserService.getUserByEmail(email);
                if (response) {
                    winston_logger_1.default.log('info', 'api-UserController-getUserByEmail() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    winston_logger_1.default.log('info', 'api-UserController-getUserByEmail() | Error | User not found');
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-getUserByEmail() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { username, first_name, last_name } = req.body;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    const response = yield user_service_1.UserService.updateUser(id, username, first_name, last_name);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserController-updateUser() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error updating user');
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-updateUser() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    const response = yield user_service_1.UserService.deleteUser(id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserController-deleteUser() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error deleting user');
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-deleteUser() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static updateLastLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    const response = yield user_service_1.UserService.updateLastLogin(id);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserController-updateLastLogin() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error updating last login');
                    }
                    winston_logger_1.default.log('info', 'api-UserController-updateLastLogin() | SUCCESS');
                    res.status(200).send(response);
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-updateLastLogin() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static setRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { is_admin } = req.body;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    const response = yield user_service_1.UserService.setRole(id, is_admin);
                    if (response) {
                        winston_logger_1.default.log('info', 'api-UserController-setRole() | SUCCESS');
                        res.status(200).send(response);
                    }
                    else {
                        throw new Error('Error setting role');
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-UserController-setRole() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.UserController = UserController;

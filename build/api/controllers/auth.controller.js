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
exports.AuthController = void 0;
const winston_logger_1 = __importDefault(require("../../utils/winston-logger"));
const auth_service_1 = require("../services/auth.service");
const supabase_1 = require("../../supabase");
const user_service_1 = require("../services/user.service");
class AuthController {
    static login(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { data, error } = yield supabase_1.supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });
                if (error) {
                    winston_logger_1.default.log('error', 'api-AuthController-login() | ERROR | ' + error.message);
                    error.status
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error);
                }
                else {
                    const authUser = yield user_service_1.UserService.getUserByEmail(email);
                    if (authUser && ((_a = data === null || data === void 0 ? void 0 : data.session) === null || _a === void 0 ? void 0 : _a.access_token) && ((_b = data === null || data === void 0 ? void 0 : data.session) === null || _b === void 0 ? void 0 : _b.refresh_token)) {
                        const userLoginResponse = {
                            user: authUser,
                            access_token: data.session.access_token,
                            refresh_token: data.session.refresh_token,
                        };
                        winston_logger_1.default.log('info', 'api-AuthController-login() | SUCCESS');
                        res.status(200).send(userLoginResponse);
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-login() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-login() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static signup(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, username, first_name, last_name, is_admin } = req.body;
                const allUsers = yield user_service_1.UserService.getUsers();
                const userExists = allUsers === null || allUsers === void 0 ? void 0 : allUsers.find((user) => user.email === email || user.username === username);
                if (userExists) {
                    winston_logger_1.default.log('error', 'api-AuthController-signup() | ERROR | User already exists');
                    res.status(400).send({ error: 'User already exists' });
                    return;
                }
                const { data, error } = yield supabase_1.supabase.auth.signUp({
                    email: email,
                    password: password,
                });
                if (error) {
                    winston_logger_1.default.log('error', 'api-AuthController-signup() | ERROR | ' + error.message);
                    error.status
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error);
                }
                else {
                    const authUser = yield user_service_1.UserService.getUserByEmail(email);
                    if (authUser && ((_a = data === null || data === void 0 ? void 0 : data.session) === null || _a === void 0 ? void 0 : _a.access_token) && ((_b = data === null || data === void 0 ? void 0 : data.session) === null || _b === void 0 ? void 0 : _b.refresh_token)) {
                        const updatedUser = yield user_service_1.UserService.updateUser(authUser.id, username, first_name, last_name);
                        const updatedUserWithRole = yield user_service_1.UserService.setRole(authUser.id, is_admin);
                        if (!updatedUser || !updatedUserWithRole) {
                            winston_logger_1.default.log('error', 'api-AuthController-signup() | ERROR | User not updated');
                            res.status(500).send({ error: 'User not updated' });
                            return;
                        }
                        const userSignupResponse = {
                            user: updatedUserWithRole,
                            access_token: data.session.access_token,
                            refresh_token: data.session.refresh_token,
                        };
                        winston_logger_1.default.log('info', 'api-AuthController-signup() | SUCCESS');
                        res.status(200).send(userSignupResponse);
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-signup() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-signup() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refresh_token } = req.body;
                const { data, error } = yield supabase_1.supabase.auth.refreshSession({ refresh_token });
                const { session, user } = data;
                if (error) {
                    winston_logger_1.default.log('error', 'api-AuthController-refreshToken() | ERROR | ' + error.message);
                    error.status
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error);
                }
                else if (user === null || user === void 0 ? void 0 : user.email) {
                    const authUser = yield user_service_1.UserService.getUserByEmail(user === null || user === void 0 ? void 0 : user.email);
                    if (authUser && (session === null || session === void 0 ? void 0 : session.access_token) && (session === null || session === void 0 ? void 0 : session.refresh_token)) {
                        const userSignupResponse = {
                            user: authUser,
                            access_token: session.access_token,
                            refresh_token: session.refresh_token,
                        };
                        winston_logger_1.default.log('info', 'api-AuthController-refreshToken() | SUCCESS');
                        res.status(200).send(userSignupResponse);
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-refreshToken() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-AuthController-refreshToken() | ERROR | User not found');
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-refreshToken() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static changePasswordAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { password, confirmPassword } = req.body;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    // Invoke an edge function called reset-password
                    const { data, error } = yield supabase_1.supabase.functions.invoke('reset-password', {
                        body: JSON.stringify({
                            userId: id,
                            password: password,
                            confirmPassword: confirmPassword
                        })
                    });
                    if (error) {
                        winston_logger_1.default.log('error', 'api-AuthController-changePasswordAdmin() | ERROR | ' + error.message);
                        error.status
                            ? res.status(error.status).send(error)
                            : res.status(500).send(error);
                    }
                    else {
                        winston_logger_1.default.log('info', 'api-AuthController-changePasswordAdmin() | SUCCESS');
                        res.status(200).send(data);
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-changePasswordAdmin() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword } = req.body;
                const supabaseUser = yield auth_service_1.AuthService.authenticateUser(req.headers.authorization || '');
                if (supabaseUser && supabaseUser.email) {
                    const user = yield user_service_1.UserService.getUserByEmail(supabaseUser.email);
                    if (user) {
                        // Invoke an edge function called reset-password
                        const { data, error } = yield supabase_1.supabase.functions.invoke('reset-password', {
                            body: JSON.stringify({
                                userId: user.id,
                                password: password,
                                confirmPassword: confirmPassword
                            })
                        });
                        if (error) {
                            winston_logger_1.default.log('error', 'api-AuthController-changePassword() | ERROR | ' + error.message);
                            error.status
                                ? res.status(error.status).send(error)
                                : res.status(500).send(error);
                        }
                        else {
                            winston_logger_1.default.log('info', 'api-AuthController-changePassword() | SUCCESS');
                            res.status(200).send(data);
                        }
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-changePassword() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-AuthController-changePassword() | ERROR | Forbidden');
                    res.status(403).send({ error: 'Forbidden' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-changePassword() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteUserAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_service_1.UserService.getUserById(id);
                if (user) {
                    // Invoke an edge function called reset-password
                    const { data, error } = yield supabase_1.supabase.functions.invoke('delete-user', {
                        body: JSON.stringify({
                            userId: id
                        })
                    });
                    if (error) {
                        winston_logger_1.default.log('error', 'api-AuthController-deleteUserAdmin() | ERROR | ' + error.message);
                        error.status
                            ? res.status(error.status).send(error)
                            : res.status(500).send(error);
                    }
                    else {
                        winston_logger_1.default.log('info', 'api-AuthController-deleteUserAdmin() | SUCCESS');
                        res.status(200).send(data);
                    }
                }
                else {
                    res.status(404).send({ error: 'User not found' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-deleteUserAdmin() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                winston_logger_1.default.log('info', 'api-AuthController-deleteUser() | START' + req.headers['Authorization'] || '');
                const supabaseUser = yield auth_service_1.AuthService.authenticateUser(req.headers.authorization || '');
                if (supabaseUser && supabaseUser.email) {
                    const user = yield user_service_1.UserService.getUserByEmail(supabaseUser.email);
                    if (user) {
                        // Invoke an edge function called reset-password
                        const { data, error } = yield supabase_1.supabase.functions.invoke('delete-user', {
                            body: JSON.stringify({
                                userId: user.id
                            })
                        });
                        if (error) {
                            winston_logger_1.default.log('error', 'api-AuthController-deleteUser() | ERROR | ' + error.message);
                            error.status
                                ? res.status(error.status).send(error)
                                : res.status(500).send(error);
                        }
                        else {
                            winston_logger_1.default.log('info', 'api-AuthController-deleteUser() | SUCCESS');
                            res.status(200).send(data);
                        }
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-deleteUser() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-AuthController-deleteUser() | ERROR | Forbidden');
                    res.status(403).send({ error: 'Forbidden' });
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-deleteUser() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { access_token } = req.body;
                const { error } = yield supabase_1.supabase.auth.signOut(access_token);
                if (error) {
                    winston_logger_1.default.log('error', 'api-AuthController-logout() | ERROR | ' + error.message);
                    error.status
                        ? res.status(error.status).send(error)
                        : res.status(500).send(error);
                }
                else {
                    winston_logger_1.default.log('info', 'api-AuthController-logout() | SUCCESS');
                    res.status(200).send();
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-logout() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
    static authenticateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let auth = req.headers.authorization || '';
                const jwt = auth.split(' ')[1];
                const supabaseUser = yield auth_service_1.AuthService.authenticateUser(jwt);
                if (supabaseUser === null || supabaseUser === void 0 ? void 0 : supabaseUser.email) {
                    const user = yield user_service_1.UserService.getUserByEmail(supabaseUser.email);
                    if (user) {
                        winston_logger_1.default.log('info', 'api-AuthController-authenticateUser() | SUCCESS');
                        res.status(200).send({ user: user, supabaseUser: supabaseUser });
                    }
                    else {
                        winston_logger_1.default.log('error', 'api-AuthController-authenticateUser() | ERROR | User not found');
                        res.status(404).send({ error: 'User not found' });
                    }
                }
                else {
                    winston_logger_1.default.log('error', 'api-AuthController-authenticateUser() | ERROR | User not found');
                    res.status(404).send({ error: 'User not found' });
                    return;
                }
            }
            catch (e) {
                const typedE = e;
                winston_logger_1.default.log('error', 'api-AuthController-authenticateUser() | Error | ' + String(typedE.message));
                res.status(500).send({ error: typedE.message });
            }
        });
    }
}
exports.AuthController = AuthController;

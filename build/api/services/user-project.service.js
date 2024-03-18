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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProjectService = void 0;
const supabase_1 = require("../../supabase");
const project_service_1 = require("./project.service");
const user_service_1 = require("./user.service");
class UserProjectService {
    static getUserProject(user_id, project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .select("*")
                .eq("user_id", user_id)
                .eq("project_id", project_id);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static getUsersByProject(project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .select("*")
                .eq("project_id", project_id);
            if (error) {
                throw new Error(error.message);
            }
            const users = [];
            for (let i = 0; i < data.length; i++) {
                const user = yield user_service_1.UserService.getUserById(data[i].user_id);
                if (user) {
                    let userOnReturn = users.find(u => u.user.id === user.id);
                    if (!userOnReturn) {
                        users.push({ user: user, roles: [data[i].role] });
                    }
                    else {
                        console.log(userOnReturn);
                        userOnReturn = Object.assign(Object.assign({}, userOnReturn), { roles: userOnReturn.roles.concat(data[i].role) });
                        const userPair = users.find(u => u.user.id === user.id);
                        if (userPair) {
                            userPair.roles = userOnReturn.roles;
                        }
                    }
                }
            }
            return users;
        });
    }
    static getProjectsByUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .select("*")
                .eq("user_id", user_id);
            if (error) {
                throw new Error(error.message);
            }
            const projects = [];
            for (let i = 0; i < data.length; i++) {
                const project = yield project_service_1.ProjectService.getProjectById(data[i].project_id);
                if (project) {
                    projects.push({ project: project, role: data[i].role });
                }
            }
            return projects;
        });
    }
    static addUserToProject(user_id, project_id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .insert(role
                ? [{ user_id, project_id, role }]
                : [{ user_id, project_id }])
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static removeUserFromProject(user_id, project_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .delete()
                .eq("user_id", user_id)
                .eq("project_id", project_id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static setUserRoleInProject(user_id, project_id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("user_projects")
                .update({ role })
                .eq("user_id", user_id)
                .eq("project_id", project_id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.UserProjectService = UserProjectService;

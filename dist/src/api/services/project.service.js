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
exports.ProjectService = void 0;
const supabase_1 = require("../../supabase");
class ProjectService {
    static getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("projects")
                .select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static createProject(projectName, projectDescription, projectOwnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("projects")
                .insert([
                {
                    name: projectName,
                    description: projectDescription,
                    documentation: "",
                    owner_id: projectOwnerId,
                },
            ])
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static getProjectById(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("projects")
                .select("*")
                .eq("id", projectId);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static updateProject(projectId, projectName, projectDescription, projectDocumentation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("projects")
                .update({
                name: projectName,
                description: projectDescription,
                documentation: projectDocumentation
            })
                .eq("id", projectId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static deleteProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("projects")
                .delete()
                .eq("id", projectId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.ProjectService = ProjectService;

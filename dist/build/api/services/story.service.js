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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryService = void 0;
const supabase_1 = require("../../supabase");
class StoryService {
    static getStories() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase.from("story").select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getStoriesByProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .select("*")
                .eq("project_id", projectId);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getStoriesBySprint(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .select("*")
                .eq("sprint_id", sprintId);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getStoryById(storyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .select("*")
                .eq("id", storyId);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static createStory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { project_id, name, description, priority, business_value, point_estimation, acceptance_criteria } = params;
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .insert([
                {
                    project_id,
                    name,
                    description,
                    priority,
                    business_value,
                    point_estimation,
                    acceptance_criteria,
                },
            ])
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static updateStory(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sprint_id, name, description, priority, business_value, point_estimation, status, acceptance_criteria, rejected_comment } = params;
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .update({
                sprint_id,
                name,
                description,
                priority,
                business_value,
                point_estimation,
                status,
                acceptance_criteria,
                rejected_comment
            })
                .eq("id", id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static deleteStory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("story")
                .delete()
                .eq("id", id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.StoryService = StoryService;

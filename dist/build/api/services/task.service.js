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
exports.TaskService = void 0;
const supabase_1 = require("../../supabase");
class TaskService {
    static getTasksByStory(storyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .select("*")
                .eq("story_id", storyId);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getTasksByAssignee(assigneeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .select("*")
                .eq("assignee_id", assigneeId);
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getTaskBySprint(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { data: stories, error: storiesError } = yield supabase_1.supabase
                    .from("story")
                    .select("id")
                    .eq("sprint_id", sprintId);
                if (storiesError) {
                    throw new Error(storiesError.message);
                }
                if (!stories || stories.length === 0) {
                    return null;
                }
                const storyIds = stories.map((story) => story.id);
                let { data: tasks, error: tasksError } = yield supabase_1.supabase
                    .from("tasks")
                    .select("*")
                    .in("story_id", storyIds);
                if (tasksError) {
                    throw new Error(tasksError.message);
                }
                return tasks;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .select("*")
                .eq("id", taskId);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static createTask(storyId, timeEstimation, description, assigneeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .insert([
                {
                    story_id: storyId,
                    time_estimation: timeEstimation,
                    description: description,
                    assignee_id: assigneeId,
                    status: status,
                },
            ])
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static updateTask(taskId, timeEstimation, timeNeeded, description, status, assigneeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .update({
                time_estimation: timeEstimation,
                time_needed: timeNeeded,
                description: description,
                status: status,
                assignee_id: assigneeId,
            })
                .eq("id", taskId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("tasks")
                .delete()
                .eq("id", taskId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.TaskService = TaskService;

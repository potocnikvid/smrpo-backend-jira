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
exports.SprintService = void 0;
const supabase_1 = require("../../supabase");
class SprintService {
    static getCurrentSprint(projectId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedDate = date.toISOString().split('T')[0];
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .select("*")
                .eq("project_id", projectId)
                .lte("start_date", formattedDate)
                .gte("end_date", formattedDate);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static getSprints(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .select("*")
                .eq("project_id", projectId)
                .order("start_date", { ascending: false });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getSprintById(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .select("*")
                .eq("id", sprintId);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static createSprint(velocity, projectId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .insert({ velocity, project_id: projectId, start_date: startDate, end_date: endDate })
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static updateSprint(sprintId, velocity, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .update({ velocity, start_date: startDate, end_date: endDate })
                .eq("id", sprintId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static deleteSprint(sprintId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("sprints")
                .delete()
                .eq("id", sprintId)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.SprintService = SprintService;

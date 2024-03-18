import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { UserModel } from "../models/user.model";
import { ProjectModel } from "../models/project.model";
import { SprintModel } from "../models/sprint.model";

export class SprintService {
    public static async getCurrentSprint(projectId: number, date: Date): Promise<SprintModel | null> {
        const formattedDate = date.toISOString().split('T')[0];        
        const { data, error } = await supabase
            .from("sprints")
            .select("*")
            .eq("project_id", projectId)
            .lte("start_date", formattedDate)
            .gte("end_date", formattedDate);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async getSprints(projectId: number): Promise<SprintModel[] | null> {
        const { data, error } = await supabase
            .from("sprints")
            .select("*")
            .eq("project_id", projectId)
            .order("start_date", { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    public static async getSprintById(sprintId: number): Promise<SprintModel | null> {
        const { data, error } = await supabase
            .from("sprints")
            .select("*")
            .eq("id", sprintId);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async createSprint(velocity:number,projectId:number,startDate:Date,endDate:Date): Promise<SprintModel | null> {
        const { data, error } = await supabase
            .from("sprints")
            .insert({velocity,project_id:projectId,start_date:startDate,end_date:endDate})
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async updateSprint(sprintId:number,velocity:number,startDate:Date,endDate:Date): Promise<SprintModel | null> {
        const { data, error } = await supabase
            .from("sprints")
            .update({velocity,start_date:startDate,end_date:endDate})
            .eq("id", sprintId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async deleteSprint(sprintId:number): Promise<SprintModel | null> {
        const { data, error } = await supabase
            .from("sprints")
            .delete()
            .eq("id", sprintId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
}

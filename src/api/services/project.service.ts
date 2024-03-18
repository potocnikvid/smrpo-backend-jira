import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { User } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";
import { ProjectModel } from "../models/project.model";

export class ProjectService {
    public static async getProjects(): Promise<ProjectModel[] | null> {
        const { data, error } = await supabase
            .from("projects")
            .select("*");
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    public static async createProject(
        projectName: string,
        projectDescription: string,
        projectOwnerId: string,
    ): Promise<ProjectModel | null> {
        const { data, error } = await supabase
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
    }
    public static async getProjectById(
        projectId: number
    ): Promise<ProjectModel | null> {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", projectId);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async updateProject(
        projectId: number,
        projectName: string,
        projectDescription: string,
        projectDocumentation: string,
    ): Promise<ProjectModel | null> {
        const { data, error } = await supabase
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
    }
    public static async deleteProject(
        projectId: number
    ): Promise<ProjectModel | null> {
        const { data, error } = await supabase
            .from("projects")
            .delete()
            .eq("id", projectId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
}
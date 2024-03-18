import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { supabaseAdmin } from "../../supabase";
import { User } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";
import { ProjectService } from "./project.service";
import { ProjectModel } from "../models/project.model";
import { ProjectRole, ProjectsByUserReturn, UserProjectModel, UsersOnProjectReturn } from "../models/user-project.model";
import { UserService } from "./user.service";

export class UserProjectService {
    public static async getUserProject(user_id: string, project_id: number): Promise<UserProjectModel | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .select("*")
            .eq("user_id", user_id)
            .eq("project_id", project_id)
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async getUsersByProject(project_id: number): Promise<UsersOnProjectReturn[] | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .select("*")
            .eq("project_id", project_id)
        if (error) {
            throw new Error(error.message);
        }
        const users: UsersOnProjectReturn[] = [];
        for (let i = 0; i < data.length; i++) {
            const user = await UserService.getUserById(data[i].user_id);
            if (user) {
                let userOnReturn = users.find(u => u.user.id === user.id)
                if (!userOnReturn) {
                    users.push({user: user, roles: [data[i].role]});
                } else {
                    console.log(userOnReturn)
                    userOnReturn = {...userOnReturn, roles: userOnReturn.roles.concat(data[i].role)}
                    const userPair = users.find(u => u.user.id === user.id)
                    if (userPair) {
                        userPair.roles = userOnReturn.roles
                    }
                }
                
            }
        }
        return users;
    }
    public static async getProjectsByUser(user_id: string): Promise<ProjectsByUserReturn[] | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .select("*")
            .eq("user_id", user_id)
        if (error) {
            throw new Error(error.message);
        }
        const projects: ProjectsByUserReturn[] = [];
        for (let i = 0; i < data.length; i++) {
            const project = await ProjectService.getProjectById(data[i].project_id);
            if (project) {
                projects.push({project: project, role: data[i].role});
            }
        }
        return projects;
    }
    public static async addUserToProject(user_id: string, project_id: number, role: ProjectRole | undefined): Promise<UserProjectModel | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .insert(
                role 
                ? [{ user_id, project_id, role }] 
                : [{ user_id, project_id }])
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
    public static async removeUserFromProject(user_id: string, project_id: number): Promise<UserProjectModel | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .delete()
            .eq("user_id", user_id)
            .eq("project_id", project_id)
            .select();
        if (error) {
        throw new Error(error.message);
        }
        return data[0];
    }
    public static async setUserRoleInProject(user_id: string, project_id: number, role: ProjectRole): Promise<UserProjectModel | null>{
        const { data, error } = await supabase
            .from("user_projects")
            .update({ role })
            .eq("user_id", user_id)
            .eq("project_id", project_id)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }
}

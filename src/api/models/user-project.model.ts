import { ProjectModel } from "./project.model";
import { UserModel } from "./user.model";

export interface UserProjectModel{
    id: number;
    project_id: number;
    user_id: string;
    role: ProjectRole;
    created_at: Date;
}

export enum ProjectRole {
    NULL = 'NULL',
    OWNER = 'OWNER',
    DEVELOPER = 'DEVELOPER',
    SCRUM_MASTER = 'SCRUM_MASTER',
    PRODUCT_OWNER = 'PRODUCT_OWNER'
}

export interface UsersOnProjectReturn {
    user: UserModel, 
    roles: ProjectRole[]
}

export interface ProjectsByUserReturn {
    project: ProjectModel, 
    role: ProjectRole
}
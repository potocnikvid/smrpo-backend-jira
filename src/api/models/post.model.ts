export interface PostModel {
    id: number;
    project_id: number;
    user_id: string;
    content: string;
    created_at: Date;
}
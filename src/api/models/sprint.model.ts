export interface SprintModel {
    id: number;
    project_id: number;
    velocity: number;
    start_date: string;
    end_date: string;
    created_at: Date;
}
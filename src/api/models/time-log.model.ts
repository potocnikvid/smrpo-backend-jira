export interface TimeLogModel {
    id: number;
    task_id: number;
    user_id: string;
    date: Date;
    time_from: Date;
    time_to: Date;
    created_at: Date;
}
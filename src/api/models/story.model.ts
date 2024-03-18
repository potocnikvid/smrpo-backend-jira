export interface StoryModel {
    id: number;
    project_id: number;
    sprint_id: number;
    name: string;
    description: string;
    priority: StoryPriority;
    business_value: number;
    point_estimation: number;
    status: StoryStatus;
    acceptance_criteria: string;
    created_at: Date;
}

export interface StoryCreateRequest {
    project_id: number;
    name: string;
    description: string;
    priority: StoryPriority;
    business_value: number;
    point_estimation: number;
    acceptance_criteria: string;
}

export interface StoryUpdateRequest {
    sprint_id: number;
    name: string;
    description: string;
    priority: StoryPriority;
    business_value: number;
    point_estimation: number;
    status: StoryStatus;
    acceptance_criteria: string;
    rejected_comment: string;
}

export enum StoryStatus {
    PRODUCT = 'PRODUCT',
    SPRINT = 'SPRINT',
    DONE = 'DONE'
}

export enum StoryPriority {
    COULD_HAVE = 'COULD_HAVE',
    SHOULD_HAVE = 'SHOULD_HAVE',
    MUST_HAVE = 'MUST_HAVE',
    WONT_HAVE_THIS_TIME = 'WONT_HAVE_THIS_TIME'
}
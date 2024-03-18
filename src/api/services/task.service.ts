import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { TaskModel, TaskStatus } from "../models/task.model";
import { SprintModel } from "../models/sprint.model";
import { StoryModel } from "../models/story.model";

export class TaskService {
  public static async getTasksByStory(
    storyId: number
  ): Promise<TaskModel[] | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("story_id", storyId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getTasksByAssignee(
    assigneeId: string
  ): Promise<TaskModel[] | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("assignee_id", assigneeId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getTaskBySprint(
    sprintId: number
  ): Promise<TaskModel[] | null> {
    try {
      let { data: stories, error: storiesError } = await supabase
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

      let { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .in("story_id", storyIds);
      if (tasksError) {
        throw new Error(tasksError.message);
      }

      return tasks;
    } catch (error) {
      throw error;
    }
  }
  public static async getTaskById(taskId: number): Promise<TaskModel | null> {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async createTask(
    storyId: number,
    timeEstimation: number,
    description: string,
    assigneeId: string | null,
    status: TaskStatus | null
  ): Promise<TaskModel | null> {
    const { data, error } = await supabase
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
  }
  public static async updateTask(
    taskId: number,
    timeEstimation: number,
    timeNeeded: number,
    description: string,
    status: TaskStatus | null,
    assigneeId: string | null
  ): Promise<TaskModel | null> {
    const { data, error } = await supabase
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
  }
  public static async deleteTask(taskId: number): Promise<TaskModel | null> {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
}

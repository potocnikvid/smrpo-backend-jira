import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import {
  StoryModel,
  StoryUpdateRequest,
  StoryCreateRequest,
} from "../models/story.model";

export class StoryService {
  public static async getStories(): Promise<StoryModel[] | null> {
    const { data, error } = await supabase.from("story").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getStoriesByProject(
    projectId: number
  ): Promise<StoryModel[] | null> {
    const { data, error } = await supabase
      .from("story")
      .select("*")
      .eq("project_id", projectId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getStoriesBySprint(
    sprintId: number
  ): Promise<StoryModel[] | null> {
    const { data, error } = await supabase
      .from("story")
      .select("*")
      .eq("sprint_id", sprintId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getStoryById(
    storyId: number
  ): Promise<StoryModel | null> {
    const { data, error } = await supabase
      .from("story")
      .select("*")
      .eq("id", storyId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async createStory(
    params: StoryCreateRequest
  ): Promise<StoryModel | null> {
    const { project_id, name, description, priority, business_value, point_estimation, acceptance_criteria } = params;
    const { data, error } = await supabase
      .from("story")
      .insert([
        {
            project_id,
            name,
            description,
            priority,
            business_value,
            point_estimation,
            acceptance_criteria,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async updateStory(
    id: number,
    params: StoryUpdateRequest
  ): Promise<StoryModel | null> {
    const { sprint_id, name, description, priority, business_value, point_estimation, status, acceptance_criteria, rejected_comment } = params;
    const { data, error } = await supabase
      .from("story")
      .update({
        sprint_id,
        name,
        description,
        priority,
        business_value,
        point_estimation,
        status,
        acceptance_criteria,
        rejected_comment
      })
      .eq("id", id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
    public static async deleteStory(
        id: number
    ): Promise<StoryModel | null> {
        const { data, error } = await supabase
        .from("story")
        .delete()
        .eq("id", id)
        .select();
        if (error) {
        throw new Error(error.message);
        }
        return data[0];
    }
}

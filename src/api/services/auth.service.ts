import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { supabaseAdmin } from "../../supabase";
import { Session, User } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";


export class AuthService {

  public static async signUp(email: string, password: string): Promise<any | null>{
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async login(email: string, password: string): Promise<any | null>{
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async logout(): Promise<void>{
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
  }
  public static async changePassword(newPassword: string): Promise<void>{
      const { error } = await supabase.auth.updateUser({
          password: newPassword,
      });
      if (error) {
          throw new Error(error.message);
      }
  }
  public static async authenticateUser(jwt: string): Promise<User | null>{
    const { data, error } = await supabase.auth.getUser(jwt);
    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  }
}

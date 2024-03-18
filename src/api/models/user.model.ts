export interface UserModel {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  created_at: Date;
  last_login: Date;
}

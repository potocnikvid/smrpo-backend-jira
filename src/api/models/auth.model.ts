import { UserModel } from "./user.model";

export interface UserLoginResponse {
    user: UserModel;
    access_token: string;
    refresh_token: string;
}

export interface UserSignupResponse extends UserLoginResponse {}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const supabase_1 = require("../../supabase");
const supabase_2 = require("../../supabase");
class UserService {
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("users_data")
                .select("*");
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield supabase_1.supabase
                    .from("users_data")
                    .select("*")
                    .eq("id", id);
                if (error) {
                    throw new Error(error.message);
                }
                return data[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("users_data")
                .select("*")
                .eq("email", email);
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static updateUser(id, username, first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("users_data")
                .update({ username, first_name, last_name })
                .eq("id", id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_2.supabaseAdmin.auth.admin.deleteUser(id);
            if (error) {
                throw new Error(error.message);
            }
            return data.user;
        });
    }
    static updateLastLogin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("users_data")
                .update({ last_login: new Date() })
                .eq("id", id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
    static setRole(id, is_admin) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase
                .from("users_data")
                .update({ is_admin: is_admin })
                .eq("id", id)
                .select();
            if (error) {
                throw new Error(error.message);
            }
            return data[0];
        });
    }
}
exports.UserService = UserService;

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
exports.AuthService = void 0;
const supabase_1 = require("../../supabase");
class AuthService {
    static signUp(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                throw new Error(error.message);
            }
            return data;
        });
    }
    static logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase_1.supabase.auth.signOut();
            if (error) {
                throw new Error(error.message);
            }
        });
    }
    static changePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield supabase_1.supabase.auth.updateUser({
                password: newPassword,
            });
            if (error) {
                throw new Error(error.message);
            }
        });
    }
    static authenticateUser(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase_1.supabase.auth.getUser(jwt);
            if (error) {
                throw new Error(error.message);
            }
            return data.user;
        });
    }
}
exports.AuthService = AuthService;

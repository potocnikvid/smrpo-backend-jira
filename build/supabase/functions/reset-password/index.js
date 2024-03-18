"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
const supabase_js_2_1 = require("https://esm.sh/@supabase/supabase-js@2");
const updatePassword = (supabase, userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: user, error } = yield supabase.auth.admin.updateUserById(userId, {
        password: password
    });
    if (error)
        throw error;
    return user;
});
const checkPermission = (header, supabase) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: { user } } = yield supabase.auth.getUser(header.split(" ")[1]);
    if (user) {
        return user.id;
    }
    else {
        throw new Error("Permission denied");
    }
});
(0, server_ts_1.serve)((req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const supabase = (0, supabase_js_2_1.createClient)((_a = Deno.env.get("SUPABASE_URL")) !== null && _a !== void 0 ? _a : "", (_b = Deno.env.get("SUPABASE_ANON_KEY")) !== null && _b !== void 0 ? _b : "", {
        global: {
            headers: {
                Authorization: (_c = ("Bearer " + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))) !== null && _c !== void 0 ? _c : ""
            }
        }
    });
    try {
        const data = yield req.json();
        const userId = data.userId;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        // const authHeader = req.headers.get("Authorization");
        // const userId = await checkPermission(authHeader,supabase);
        if (userId) {
            // Raise an error if the passwords don't match or if the password is shorter than 8 characters
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
            // Check if password is 12 characters and has at least one uppercase letter, one lowercase letter, one number, and one special character
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{12,})/)) {
                throw new Error("Password must be at least 12 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
            }
            // Update the user's password
            const user = yield updatePassword(supabase, userId, password);
            return new Response(JSON.stringify({
                "message": "Password updated successfully",
                "user": user
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            });
        }
        else {
            throw new Error("Permission denied");
        }
    }
    catch (error) {
        return new Response(JSON.stringify({
            message: error.message
        }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        });
    }
}));

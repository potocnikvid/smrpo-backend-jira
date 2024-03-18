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
const server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
const supabase_js_2_1 = require("https://esm.sh/@supabase/supabase-js@2");
const deleteUser = (supabase, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabase.auth.admin.deleteUser(userId);
    if (error)
        throw error;
    return data;
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
        // const authHeader = req.headers.get("Authorization");
        // const userId = await checkPermission(authHeader,supabase);
        const data = yield req.json();
        const userId = data.userId;
        if (userId) {
            const user = yield deleteUser(supabase, userId);
            return new Response(JSON.stringify({
                "message": "User deleted successfully",
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

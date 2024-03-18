import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const deleteUser = async (supabase, userId)=>{
    const { data, error } = await supabase.auth.admin.deleteUser(
        userId
    )
    if (error) throw error;
    return data;
};

const checkPermission = async (header, supabase) => {
    const { data: { user } } = await supabase.auth.getUser(header.split(" ")[1]);
    if (user) {
        return user.id;
    } else {
        throw new Error("Permission denied");
    }
}

serve(async (req)=>{
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
        global: {
            headers: {
                Authorization: ("Bearer " + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) ?? ""
            }
        }
    });
    try {
        // const authHeader = req.headers.get("Authorization");
        // const userId = await checkPermission(authHeader,supabase);
        const data = await req.json();
        const userId = data.userId;

        if (userId) {
            const user = await deleteUser(supabase, userId);
            return new Response(JSON.stringify({
                "message": "User deleted successfully",
                "user": user
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            });
        } else {
            throw new Error("Permission denied");
        }
    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message
        }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        });
    }
});

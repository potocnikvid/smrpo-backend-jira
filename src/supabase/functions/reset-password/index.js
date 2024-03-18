import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const updatePassword = async (supabase, userId, password)=>{
    const { data: user , error  } = await supabase.auth.admin.updateUserById(userId, {
        password: password
    });
    if (error) throw error;
    return user;
};

const checkPermission = async (header ,supabase) => {
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
        const data = await req.json();
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
            const user = await updatePassword(supabase, userId, password);
            
            return new Response(JSON.stringify({
                "message": "Password updated successfully",
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

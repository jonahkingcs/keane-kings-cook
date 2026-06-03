import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function getIsAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return null;
    }

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Error fetching profile:", error.message);
        return null;
    }

    if (!profile) {
        console.warn("No profile found for user");
        return null;
    }

    return profile.is_admin === true;
}
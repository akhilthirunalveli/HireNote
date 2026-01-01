import { createSupabaseServer } from "@/lib/supabase/server";

export type Template = {
    id: string;
    name: string;
    content: string;
    dynamic_fields: string[];
    tone: string | null;
    length: string | null;
    created_at: string;
    updated_at: string;
};

export async function createTemplate(data: Omit<Template, "id" | "created_at" | "updated_at">) {
    const supabase = await createSupabaseServer();
    // Get current user to ensure we are authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: inserted, error } = await supabase
        .from("templates")
        .insert({ ...data, user_id: user.id })
        .select()
        .single();

    if (error) throw new Error(error.message);
    return inserted;
}

export async function getTemplates() {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data as Template[];
}

export async function deleteTemplate(id: string) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase
        .from("templates")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);
    return true;
}

export async function getTemplateById(id: string) {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error) return null;
    return data as Template;
}

export async function updateTemplate(id: string, data: Partial<Omit<Template, "id" | "user_id" | "created_at" | "updated_at">>) {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // 1. Fetch current to save as version
    const current = await getTemplateById(id);
    if (!current) throw new Error("Template not found");

    // 2. Insert into versions
    await supabase.from("template_versions").insert({
        template_id: id,
        content: current.content,
        name: current.name,
        dynamic_fields: current.dynamic_fields,
    });

    // 3. Update template
    const { error } = await supabase
        .from("templates")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) throw new Error(error.message);
    return true;
}

export async function getTemplateVersions(id: string) {
    const supabase = await createSupabaseServer();
    // Auth check implied by RLS but good to have user check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
        .from("template_versions")
        .select("*")
        .eq("template_id", id)
        .order("created_at", { ascending: false });

    if (error) return [];
    return data;
}

export async function restoreVersion(templateId: string, versionId: string) {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    // Fetch version content
    const { data: version } = await supabase
        .from("template_versions")
        .select("*")
        .eq("id", versionId)
        .single();

    if (!version) throw new Error("Version not found");

    // Update template with version content (and this triggers a new version save too due to logic? No, specific restore logic usually overwrites)
    // Actually, let's treat restore as an update, so we SAVE the State Before Restore as a version too.
    // So we simply call updateTemplate with version data.

    return updateTemplate(templateId, {
        content: version.content,
        name: version.name,
        dynamic_fields: version.dynamic_fields
    });
}

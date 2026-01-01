"use server";

import { geminiGenerateText } from "@/lib/ai/gemini";
import { detectPlaceholdersPrompt, templateGenerationPrompt, refineMessagePrompt } from "@/lib/ai/prompts";

export async function detectPlaceholdersAction(text: string, userApiKey?: string) {
    if (!text.trim()) return { success: false, error: "Empty text" };

    try {
        const prompt = detectPlaceholdersPrompt(text);
        const result = await geminiGenerateText({ prompt, apiKey: userApiKey });

        if (!result) {
            return { success: false, error: "Failed to generate text" };
        }

        // Return the rewriting text which should contain {placeholders}
        return { success: true, template: result };
    } catch (error) {
        console.error("AI Detection Error:", error);
        return { success: false, error: "Internal error during detection" };
    }
}

export async function generateTemplateAction(userPrompt: string, userApiKey?: string) {
    if (!userPrompt.trim()) return { success: false, error: "Empty prompt" };

    try {
        const prompt = templateGenerationPrompt(userPrompt);
        const result = await geminiGenerateText({ prompt, apiKey: userApiKey });

        if (!result) {
            return { success: false, error: "Failed to generate template" };
        }

        return { success: true, template: result };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return { success: false, error: "Internal error during generation" };
    }
}

export async function refineMessageAction(text: string, tone: string, length: string, userApiKey?: string) {
    if (!text.trim()) return { success: false, error: "Empty text" };

    try {
        const prompt = refineMessagePrompt(text, tone, length);
        const result = await geminiGenerateText({ prompt, apiKey: userApiKey });

        if (!result) {
            return { success: false, error: "Failed to refine message" };
        }

        return { success: true, message: result };
    } catch (error) {
        console.error("AI Refinement Error:", error);
        return { success: false, error: "Internal error during refinement" };
    }
}

import { createTemplate, deleteTemplate } from "@/lib/db/templates";
import { revalidatePath } from "next/cache";

export async function saveTemplateAction(data: { name: string; content: string; dynamic_fields: string[]; tone: string; length: string }) {
    try {
        await createTemplate(data);
        revalidatePath("/dashboard/templates");
        return { success: true };
    } catch (error) {
        console.error("Save Template Error:", error);
        return { success: false, error: "Failed to save template" };
    }
}

export async function deleteTemplateAction(id: string) {
    try {
        await deleteTemplate(id);
        revalidatePath("/dashboard/templates");
        return { success: true };
    } catch (error) {
        console.error("Delete Template Error:", error);
        return { success: false, error: "Failed to delete template" };
    }
}

import { createSupabaseServer } from "@/lib/supabase/server";

export async function updateProfileAction(formData: FormData) {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const fullName = formData.get("fullName") as string;
    let username: string | null = formData.get("username") as string;

    // Treat empty string as null to satisfy constraint
    if (!username || username.trim() === "") {
        username = null;
    }

    try {
        const { error } = await supabase
            .from("profiles")
            .update({ full_name: fullName, username })
            .eq("id", user.id);

        if (error) throw error;

        revalidatePath("/dashboard/settings");
        return { success: true };
    } catch (error: any) {
        console.error("Profile Update Error:", error);
        return { success: false, error: error.message || "Failed to update profile" };
    }
}

import { updateTemplate, getTemplateVersions, restoreVersion } from "@/lib/db/templates";

export async function updateTemplateAction(id: string, data: { name: string; content: string; dynamic_fields: string[]; tone: string; length: string }) {
    try {
        await updateTemplate(id, data);
        revalidatePath("/dashboard/templates");
        revalidatePath(`/dashboard/templates/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Update Template Error:", error);
        return { success: false, error: "Failed to update template" };
    }
}

export async function getVersionsAction(id: string) {
    try {
        const versions = await getTemplateVersions(id);
        return { success: true, versions };
    } catch (error) {
        console.error("Get Versions Error:", error);
        return { success: false, error: "Failed to fetch versions" };
    }
}

export async function restoreVersionAction(templateId: string, versionId: string) {
    try {
        await restoreVersion(templateId, versionId);
        revalidatePath("/dashboard/templates");
        revalidatePath(`/dashboard/templates/${templateId}`);
        return { success: true };
    } catch (error) {
        console.error("Restore Version Error:", error);
        return { success: false, error: "Failed to restore version" };
    }
}

export async function signOutAction() {
    const supabase = await createSupabaseServer();
    await supabase.auth.signOut();
    return { success: true };
}

import { getTemplateById } from "@/lib/db/templates";
import TemplateInput from "@/components/template/TemplateInput";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth/login");

    const resolvedParams = await params;
    const template = await getTemplateById(resolvedParams.id);

    if (!template) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Edit Template</h1>
            </div>
            <TemplateInput initialData={template} mode="edit" />
        </div>
    );
}

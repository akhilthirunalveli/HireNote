import { getTemplates } from "@/lib/db/templates";
import Link from "next/link";
import { DeleteTemplateButton } from "./_components/DeleteTemplateButton";
import { TemplateCard } from "./_components/TemplateCard";

export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-outfit">My Templates</h1>
        <Link
          href="/"
          className="primary-button px-4 py-2 text-sm"
        >
          New Template
        </Link>
      </div>

      {templates.length === 0 ? (
        <div className="glass-card p-12 text-center space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No templates yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Create your first AI-powered template to speed up your outreach.</p>
          </div>
          <Link
            href="/"
            className="primary-button px-6 py-2 inline-flex"
          >
            Create Template
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      )}
    </div>
  );
}

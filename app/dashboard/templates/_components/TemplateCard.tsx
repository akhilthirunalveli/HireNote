"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { DeleteTemplateButton } from "./DeleteTemplateButton";

type Template = {
    id: string;
    name: string;
    content: string;
    tone: string | null;
    created_at: string;
};

export function TemplateCard({ template }: { template: Template }) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/dashboard/templates/${template.id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="glass-card p-5 h-full flex flex-col gap-4 group relative overflow-hidden cursor-pointer transition-colors"
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <span className="shrink-0 text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-1 rounded-md border border-[var(--border)]">
                    {template.tone || "Neutral"}
                </span>
            </div>

            {/* Title & Date */}
            <div>
                <h4 className="font-bold text-[var(--foreground)] truncate group-hover:underline decoration-1 underline-offset-4">{template.name}</h4>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 truncate">
                    {new Date(template.created_at).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
            </div>

            {/* Content Preview */}
            <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-auto">
                {template.content}
            </p>

            {/* Actions - Positioned absolute to stay out of layout flow, matching the clean look */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[var(--background)]/80 backdrop-blur-md p-1.5 rounded-lg border border-[var(--border)] shadow-sm" onClick={(e) => e.stopPropagation()}>
                <Link
                    href={`/dashboard/templates/${template.id}`}
                    className="p-1.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 rounded-md transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </Link>
                <DeleteTemplateButton id={template.id} />
            </div>
        </div>
    );
}

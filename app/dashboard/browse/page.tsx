"use client";

import { REWARD_TEMPLATES } from "@/lib/reward-templates";
import { saveTemplateAction } from "@/app/actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BrowseTemplatesPage() {
    const router = useRouter();
    const [addingIndex, setAddingIndex] = useState<number | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<typeof REWARD_TEMPLATES[0] | null>(null);

    const handleAddTemplate = async (template: typeof REWARD_TEMPLATES[0]) => {
        // Find index for loading state if needed, or just use a generic loading
        // Using name to match for loading state in the list
        const index = REWARD_TEMPLATES.findIndex(t => t.name === template.name);
        setAddingIndex(index);

        try {
            const result = await saveTemplateAction(template);
            if (result.success) {
                toast.success("Template added to your library");
                router.refresh();
                setSelectedTemplate(null);
            } else {
                toast.error(result.error || "Failed to add template");
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setAddingIndex(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">Browse Templates</h1>
                <p className="text-[var(--muted-foreground)]">Discover high-quality templates to kickstart your writing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REWARD_TEMPLATES.map((template, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedTemplate(template)}
                        className="glass-card p-6 flex flex-col gap-5 transition-all duration-300 border-[var(--border)] hover:border-[var(--border)] relative overflow-hidden cursor-pointer"
                    >
                        <div className="flex justify-between items-start gap-4">
                            <div className="space-y-1.5">
                                <h3 className="font-bold text-lg text-[var(--foreground)] leading-none tracking-tight group-hover:underline decoration-2 underline-offset-2 decoration-[var(--foreground)]/20 transition-all">{template.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] font-medium uppercase tracking-wider">
                                    <span className="flex items-center gap-1">
                                        {template.tone}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
                                    <span>{template.length}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] shrink-0 border border-[var(--border)] group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <div className="text-sm text-[var(--muted-foreground)] font-mono leading-relaxed line-clamp-3 opacity-90">
                                {template.content}
                            </div>
                        </div>

                        <div className="pt-2 mt-auto">
                            <button
                                className="w-full py-3 rounded-xl border border-[var(--border)] font-semibold text-sm transition-all hover:bg-[var(--foreground)] hover:text-[var(--background)] flex items-center justify-center gap-2 group-hover:border-[var(--foreground)] shadow-sm hover:shadow-md"
                            >
                                View Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Template Preview Modal */}
            {selectedTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedTemplate(null)}>
                    <div
                        className="glass-card w-full max-w-2xl p-0 flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-[var(--border)] flex justify-between items-start gap-4">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-[var(--foreground)]">{selectedTemplate.name}</h2>
                                <div className="flex gap-2">
                                    <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-[10px] uppercase font-bold tracking-wider border border-[var(--border)]">
                                        {selectedTemplate.tone}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] text-[10px] uppercase font-bold tracking-wider border border-[var(--border)]">
                                        {selectedTemplate.length}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedTemplate(null)}
                                className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto flex-1 bg-[var(--muted)]/20">
                            <div className="prose prose-sm dark:prose-invert max-w-none font-mono text-sm leading-relaxed p-6 bg-[var(--background)] rounded-xl border border-[var(--border)] shadow-sm whitespace-pre-wrap">
                                {selectedTemplate.content}
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">Dynamic Fields</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTemplate.dynamic_fields.map((field) => (
                                        <span key={field} className="px-2 py-1 rounded bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium border border-[var(--primary)]/20">
                                            {field}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-[var(--border)] bg-[var(--card)] flex justify-end gap-3 rounded-b-xl">
                            <button
                                onClick={() => setSelectedTemplate(null)}
                                className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAddTemplate(selectedTemplate)}
                                disabled={addingIndex !== null}
                                className="px-6 py-2.5 rounded-xl font-bold text-sm transition-all bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
                            >
                                {addingIndex !== null ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <span>Add to Library</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

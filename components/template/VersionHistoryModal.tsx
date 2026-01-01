"use client";

import { getVersionsAction, restoreVersionAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Version = {
    id: string;
    name: string;
    content: string;
    created_at: string;
};

export function VersionHistoryModal({
    templateId,
    isOpen,
    onClose,
    onRestore
}: {
    templateId: string;
    isOpen: boolean;
    onClose: () => void;
    onRestore: () => void;
}) {
    const [versions, setVersions] = useState<Version[]>([]);
    const [loading, setLoading] = useState(false);
    const [restoringId, setRestoringId] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            getVersionsAction(templateId).then((res) => {
                if (res.success && res.versions) {
                    setVersions(res.versions as unknown as Version[]);
                }
                setLoading(false);
            });
        }
    }, [isOpen, templateId]);

    const handleRestore = async (versionId: string) => {
        toast("Restore this version?", {
            description: "Current content will be saved as a new version.",
            action: {
                label: "Restore",
                onClick: async () => {
                    setRestoringId(versionId);
                    const result = await restoreVersionAction(templateId, versionId);
                    if (result.success) {
                        toast.success("Version restored successfully");
                        onRestore();
                        onClose();
                    } else {
                        toast.error(result.error || "Failed to restore version");
                    }
                    setRestoringId(null);
                }
            },
            cancel: {
                label: "Cancel",
                onClick: () => { }
            }
        });
    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="glass-card w-full max-w-lg p-6 space-y-4 animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col shadow-2xl">
                <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
                    <h3 className="text-lg font-bold text-[var(--foreground)]">Version History</h3>
                    <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {loading ? (
                        <div className="text-center py-12 text-[var(--muted-foreground)] flex flex-col items-center gap-2">
                            <svg className="animate-spin w-5 h-5 opacity-50" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            <span className="text-xs uppercase tracking-wider font-medium">Loading history...</span>
                        </div>
                    ) : versions.length === 0 ? (
                        <div className="text-center py-12 text-[var(--muted-foreground)]">
                            <p className="text-sm">No previous versions found.</p>
                        </div>
                    ) : (
                        versions.map((v) => (
                            <div key={v.id} className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 hover:bg-[var(--muted)]/50 transition-colors flex justify-between items-center gap-4">
                                <div className="min-w-0 space-y-1">
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted-foreground)]">
                                        {new Date(v.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                    </div>
                                    <div className="text-sm truncate text-[var(--foreground)] font-mono opacity-80 group-hover:opacity-100 transition-opacity">
                                        {v.content.substring(0, 60)}...
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRestore(v.id)}
                                    disabled={!!restoringId}
                                    className="shrink-0 text-xs font-bold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 px-3 py-1.5 rounded-lg transition-all shadow-sm disabled:opacity-50 disabled:shadow-none"
                                >
                                    {restoringId === v.id ? "Restoring..." : "Restore"}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

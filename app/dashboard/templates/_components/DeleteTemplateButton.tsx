"use client";

import { deleteTemplateAction } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";

export function DeleteTemplateButton({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        toast("Permanently delete this template?", {
            action: {
                label: "Delete",
                onClick: async () => {
                    setIsDeleting(true);
                    try {
                        const result = await deleteTemplateAction(id);
                        if (!result.success) {
                            toast.error(result.error);
                        } else {
                            toast.success("Template deleted");
                        }
                    } catch {
                        toast.error("Failed to delete");
                    } finally {
                        setIsDeleting(false);
                    }
                }
            },
            cancel: {
                label: "Cancel",
                onClick: () => setIsDeleting(false)
            }
        });
    };
    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
            title="Delete Template"
        >
            {isDeleting ? (
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            ) : (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            )}
        </button>
    );
}

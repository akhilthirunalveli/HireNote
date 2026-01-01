"use client";

import { updateProfileAction } from "@/app/actions";
import { ThemeMode, useTheme } from "@/hooks/useTheme";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Profile = {
    full_name: string | null;
    username: string | null;
};

export function SettingsClient({
    userEmail,
    initialProfile
}: {
    userEmail: string;
    initialProfile: Profile | null;
}) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const [fullName, setFullName] = useState(initialProfile?.full_name || "");
    const [username, setUsername] = useState(initialProfile?.username || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSignOut = async () => {
        const supabase = getSupabaseBrowserClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const handleSave = async () => {
        if (username.length > 0 && username.length < 3) {
            toast.error("Username must be at least 3 characters long");
            return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);

        const result = await updateProfileAction(formData);
        if (result.success) {
            toast.success("Profile updated successfully");
        } else {
            console.error(result.error);
            if (result.error?.includes("username_length")) {
                toast.error("Username must be at least 3 characters long.");
            } else if (result.error?.includes("duplicate")) {
                toast.error("Username already taken.");
            } else {
                toast.error("Failed to update profile. Please try again.");
            }
        }
        setIsSaving(false);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Profile Section */}
                <div className="glass-card p-6 md:p-8 space-y-6">
                    <div className="border-b border-[var(--border)] pb-4">
                        <h2 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-widest">Profile</h2>
                        <p className="text-sm text-[var(--muted-foreground)] pt-1">Update your personal information.</p>
                    </div>

                    <div className="grid gap-6">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-[var(--muted-foreground)] font-bold tracking-widest pl-1">Email Address</label>
                            <div className="glass-input px-4 py-3 text-[var(--muted-foreground)] bg-[var(--muted)]/50 border-transparent cursor-not-allowed select-none">
                                {userEmail}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-[var(--muted-foreground)] font-bold tracking-widest pl-1">Full Name</label>
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="glass-input w-full px-4 py-3"
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-[var(--muted-foreground)] font-bold tracking-widest pl-1">Username / Goal</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="glass-input w-full px-4 py-3"
                                placeholder="e.g. Seeking Internship"
                            />
                        </div>

                        <div className="pt-2 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="primary-button py-2.5 px-6 w-full md:w-auto shadow-md"
                            >
                                {isSaving ? "Saving..." : "Update Profile"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Theme Section */}
                <div className="glass-card p-6 md:p-8 space-y-6">
                    <div className="border-b border-[var(--border)] pb-4">
                        <h2 className="text-lg font-bold text-[var(--foreground)] uppercase tracking-widest">Appearance</h2>
                        <p className="text-sm text-[var(--muted-foreground)] pt-1">Customize your interface theme.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {(["system", "light", "dark"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setTheme(mode as ThemeMode)}
                                className={`px-4 py-3 rounded-xl border font-medium transition-all text-sm flex items-center justify-center gap-2 ${theme === mode
                                    ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-md"
                                    : "bg-transparent text-[var(--muted-foreground)] border-[var(--border)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                                    }`}
                            >
                                {mode === 'light' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                                {mode === 'dark' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
                                {mode === 'system' && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

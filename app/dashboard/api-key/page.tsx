"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ApiKeyPage() {
    const [apiKey, setApiKey] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) setApiKey(storedKey);
    }, []);

    const handleSave = () => {
        if (!apiKey.trim()) {
            localStorage.removeItem("gemini_api_key");
            toast.success("API Key removed. Using system default.");
        } else {
            localStorage.setItem("gemini_api_key", apiKey.trim());
            toast.success("API Key saved securely to your browser.");
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-4xl p-6 space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">API Configuration</h1>
                <p className="text-[var(--muted-foreground)]">Manage your AI service connection settings.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Configuration Card */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-[var(--border)] space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-1">Gemini API Key</h2>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Enter your personal API key to use your own quota and limits.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-widest pl-1">
                                    Your API Key
                                </label>
                                <div className="relative">
                                    <input
                                        type={isVisible ? "text" : "password"}
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        placeholder="AIzaSy..."
                                        className="glass-input w-full px-4 py-3 pr-10 font-mono text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsVisible(!isVisible)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {isVisible ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        )}
                                    </button>
                                </div>
                                <p className="text-[10px] text-[var(--muted-foreground)] pl-1">
                                    Stored securely in your browser's local storage.
                                </p>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full primary-button py-2.5 font-bold shadow-md hover:shadow-lg transition-all"
                            >
                                Save Configuration
                            </button>
                        </div>
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="space-y-6">
                    <div className="glass-card p-6 rounded-2xl border border-[var(--border)] shadow-sm space-y-6 bg-[var(--muted)]/30">
                        <div>
                            <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                How to get your API Key
                            </h2>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Follow these simple steps to generate a free Gemini API key from Google.
                            </p>
                        </div>

                        <ol className="relative border-l border-[var(--border)] ml-3 space-y-6">
                            <li className="mb-6 ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-[var(--card)] dark:ring-gray-900 dark:bg-blue-900">
                                    <span className="text-blue-800 dark:text-blue-300 text-xs font-bold">1</span>
                                </span>
                                <h3 className="font-medium text-[var(--foreground)] mb-1">Visit Google AI Studio</h3>
                                <p className="text-xs text-[var(--muted-foreground)] mb-2">Go to the Google AI Studio dashboard to manage your API keys.</p>
                                <a
                                    href="https://aistudio.google.com/app/apikey"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-600 hover:underline"
                                >
                                    Open Google AI Studio
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                            </li>
                            <li className="mb-6 ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-[var(--card)] dark:ring-gray-900 dark:bg-blue-900">
                                    <span className="text-blue-800 dark:text-blue-300 text-xs font-bold">2</span>
                                </span>
                                <h3 className="font-medium text-[var(--foreground)] mb-1">Create API Key</h3>
                                <p className="text-xs text-[var(--muted-foreground)]">Click on <b>"Create API Key"</b> and select a project (or create a new one).</p>
                            </li>
                            <li className="ml-6">
                                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-4 ring-[var(--card)] dark:ring-gray-900 dark:bg-blue-900">
                                    <span className="text-blue-800 dark:text-blue-300 text-xs font-bold">3</span>
                                </span>
                                <h3 className="font-medium text-[var(--foreground)] mb-1">Copy & Paste</h3>
                                <p className="text-xs text-[var(--muted-foreground)]">Copy the generated key beginning with <code>AIzaSy...</code> and paste it into the field on the left.</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

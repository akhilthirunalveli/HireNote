"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/hooks/useTheme";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const links = [
        { name: "Overview", href: ROUTES.dashboard, icon: (active: boolean) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
        { name: "My Templates", href: ROUTES.templates, icon: (active: boolean) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
        { name: "Browse New", href: ROUTES.browse, icon: (active: boolean) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg> },
        { name: "Settings", href: ROUTES.settings, icon: (active: boolean) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -mr-2 text-[var(--foreground)] hover:bg-[var(--muted)] rounded-full transition-colors active:scale-95"
                aria-label="Open menu"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            {/* Premium Solid Overlay Menu - with Force Inline Styles */}
            {isOpen && (
                <div
                    className="fixed inset-0 flex flex-col p-6 animate-in slide-in-from-bottom-5 fade-in duration-200"
                    style={{
                        backgroundColor: resolvedTheme === 'dark' ? '#000000' : '#ffffff',
                        zIndex: 9999,
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        top: 0,
                        left: 0
                    }}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Logo className="w-8 h-8 text-black dark:text-white" />
                            <span className="font-outfit font-bold text-xl tracking-tight text-black dark:text-white">
                                HireNote
                            </span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 -mr-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-full bg-gray-100 dark:bg-zinc-900 border border-transparent transition-all active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        {links.map((link, idx) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                    className={`flex items-center gap-4 px-4 py-4 rounded-2xl text-lg font-medium transition-all duration-200 animate-in slide-in-from-bottom-4 fade-in fill-mode-both ${isActive
                                        ? "bg-black dark:bg-white text-white dark:text-black shadow-lg scale-[1.02]"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white"
                                        }`}
                                >
                                    {link.icon(isActive)}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Utils */}
                    <div className="mt-auto space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-500 delay-200">
                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="w-full flex items-center justify-between px-4 py-4 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-black dark:text-white font-medium active:scale-[0.98] transition-all"
                            >
                                <span className="flex items-center gap-3">
                                    {resolvedTheme === 'dark' ? (
                                        <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                    )}
                                    {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                </span>
                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${resolvedTheme === 'dark' ? 'bg-white' : 'bg-gray-200'}`}>
                                    <div className={`w-4 h-4 rounded-full shadow-sm transition-transform ${resolvedTheme === 'dark' ? 'translate-x-4 bg-black' : 'bg-white'}`} />
                                </div>
                            </button>
                        )}

                        {/* API Key Link */}
                        <Link
                            href="/dashboard/api-key"
                            onClick={() => setIsOpen(false)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all justify-center text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                            Setup API Key
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

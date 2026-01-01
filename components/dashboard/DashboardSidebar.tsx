"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

export function DashboardSidebar({ userEmail }: { userEmail?: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = async () => {
        await signOutAction();
        router.push(ROUTES.login);
        router.refresh();
    };

    const links = [
        {
            name: "Overview", href: ROUTES.dashboard, icon: (active: boolean) => (
                <svg className={`w-5 h-5 ${active ? "text-[var(--background)]" : "text-[var(--muted-foreground)]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            )
        },
        {
            name: "My Templates", href: ROUTES.templates, icon: (active: boolean) => (
                <svg className={`w-5 h-5 ${active ? "text-[var(--background)]" : "text-[var(--muted-foreground)]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            )
        },
        {
            name: "Browse New", href: ROUTES.browse, icon: (active: boolean) => (
                <svg className={`w-5 h-5 ${active ? "text-[var(--background)]" : "text-[var(--muted-foreground)]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )
        },
        {
            name: "Settings", href: ROUTES.settings, icon: (active: boolean) => (
                <svg className={`w-5 h-5 ${active ? "text-[var(--background)]" : "text-[var(--muted-foreground)]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )
        },
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 border-r border-[var(--border)] bg-[var(--card)] hidden md:flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                    <Logo className="w-8 h-8 text-[var(--foreground)]" />
                    <span className="font-outfit font-bold text-xl tracking-tight text-[var(--foreground)]">
                        HireNote
                    </span>
                </div>
                <Link
                    href={ROUTES.home}
                    className="p-2 -mr-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
                    title="Go to Home"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? "bg-[var(--foreground)] text-[var(--background)] shadow-md"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                                }`}
                        >
                            {link.icon(isActive)}
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            {/* API Key Section */}
            <div className="px-4 pb-2">
                <Link
                    href="/dashboard/api-key"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border border-dashed hover:border-[var(--foreground)] ${pathname === '/dashboard/api-key'
                        ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-md"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] border-[var(--border)]"
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    <span>Setup API Key</span>
                </Link>
            </div>

            {/* User Footer with Utils */}
            <div className="p-2 border-t border-[var(--border)] relative bg-[var(--card)]">
                {/* Clickable Profile Trigger */}
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left group relative z-20 bg-[var(--card)] hover:bg-[var(--muted)]"
                >
                    <div className="w-9 h-9 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-bold shrink-0">
                        {userEmail?.[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--foreground)] truncate">{userEmail?.split('@')[0]}</p>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--muted-foreground)] truncate">Free Plan</p>
                    </div>
                    {/* Chevron */}
                    <svg className={`w-4 h-4 text-[var(--muted-foreground)] transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>


            {/* Popover Menu */}
            {showMenu && (
                <>
                    {/* Backdrop to close on click outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />

                    <div className="absolute bottom-[4.5rem] left-4 right-4 bg-[var(--card)] border border-[var(--border)] shadow-xl rounded-xl p-2 z-20 space-y-1 animate-in slide-in-from-bottom-2 duration-200">
                        {mounted && (
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    setShowMenu(false); // keep menu open or close? usually close
                                }}
                                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors text-sm font-medium"
                            >
                                {resolvedTheme === 'dark' ? (
                                    <>
                                        <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                        Switch to Light
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                        Switch to Dark
                                    </>
                                )}
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            Log out
                        </button>
                    </div>
                </>
            )}
        </aside>
    );
}

"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { Logo } from "@/components/ui/Logo";

export function LandingNavbar({ user }: { user?: User | null }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    };

    // ...
    return (
        <div className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
            <nav className="bg-[var(--background)]/90 dark:bg-[var(--background)]/90 backdrop-blur-xl border border-[var(--border)] shadow-xl dark:shadow-2xl rounded-full px-4 py-2 md:px-6 md:py-3 flex items-center gap-2 md:gap-8 max-w-2xl w-full justify-between transition-all duration-300 hover:scale-[1.01]">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Logo className="w-8 h-8 text-[var(--foreground)] transition-transform group-hover:rotate-12" />
                    <span className="font-outfit font-bold text-lg tracking-tight text-[var(--foreground)]">
                        HireNote
                    </span>
                </Link>

                {/* Actions Group */}
                <div className="flex items-center gap-1 md:gap-3">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            )}
                        </button>
                    )}

                    <div className="h-4 w-[1px] bg-[var(--border)] mx-1"></div>

                    {user ? (
                        <Link
                            href={ROUTES.dashboard}
                            className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-[var(--muted)] transition-colors"
                        >
                            <span className="hidden sm:block text-sm font-medium text-[var(--foreground)] truncate max-w-[100px]">
                                {user.user_metadata?.full_name?.split(' ')[0] || "Dashboard"}
                            </span>
                            <div className="w-7 h-7 rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center text-xs font-bold">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={ROUTES.login}
                                className="bg-[var(--foreground)] text-[var(--background)] px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}

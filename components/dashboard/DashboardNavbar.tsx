"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/lib/constants";

export function DashboardNavbar({ userEmail }: { userEmail?: string }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const links = [
        { name: "Overview", href: ROUTES.dashboard },
        { name: "My Templates", href: ROUTES.templates },
        { name: "Settings", href: ROUTES.settings },
    ];

    return (
        <nav className="sticky top-0 z-50 px-4 py-3 bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--border)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] font-bold shadow-sm">
                            H
                        </div>
                        <Link href={ROUTES.dashboard} className="font-outfit font-bold text-xl tracking-tight text-[var(--foreground)]">
                            HireNote
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-[var(--foreground)] text-[var(--background)]"
                                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* User Profile / Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-[var(--border)]">
                            <div className="text-right hidden lg:block">
                                <p className="text-xs font-medium text-[var(--foreground)]">{userEmail?.split('@')[0]}</p>
                                <p className="text-[10px] text-[var(--muted-foreground)]">Student</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-[var(--muted)] border border-[var(--border)] flex items-center justify-center text-xs font-bold text-[var(--muted-foreground)]">
                                {userEmail?.[0].toUpperCase()}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-lg"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden mt-2 p-2 space-y-1 animate-in slide-in-from-top-2 duration-200 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-lg mx-4">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium ${pathname === link.href
                                ? "bg-[var(--foreground)] text-[var(--background)]"
                                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}

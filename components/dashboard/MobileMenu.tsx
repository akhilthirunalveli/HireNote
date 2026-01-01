"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { name: "Overview", href: ROUTES.dashboard },
        { name: "My Templates", href: ROUTES.templates },
        { name: "Settings", href: ROUTES.settings },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 -mr-2 text-[var(--foreground)] hover:bg-[var(--muted)] rounded-lg transition-colors"
                aria-label="Open menu"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            {/* Slide-over Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Panel */}
                    <div className="relative w-3/4 max-w-sm h-full bg-[var(--background)] border-l border-[var(--border)] shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between">
                            <span className="font-outfit font-bold text-xl text-[var(--foreground)]">Menu</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 -mr-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="space-y-1">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                                                ? "bg-[var(--foreground)] text-[var(--background)]"
                                                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const row1 = [
    "Cold Email to Founder", "Networking Request", "Investment Inquiry", "Job Application Follow-up",
];

const row2 = [
    "Sales Pitch", "Partnership Proposal", "Mentorship Request", "Follow-up after Interview",
];

import { User } from "@supabase/supabase-js";

export function TemplateScroller({ user }: { user?: User | null }) {
    return (
        <div className="w-full relative overflow-hidden py-16 bg-transparent">
            {/* Subtle Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none"></div>

            {/* Row 1 - Slower, Right */}
            <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused] mb-6 opacity-60">
                {[...row1, ...row1, ...row1, ...row1].map((template, i) => (
                    <div
                        key={`r1-${i}`}
                        className="mx-3 px-5 py-2 rounded-xl border border-[var(--foreground)]/5 bg-[var(--foreground)]/5 backdrop-blur-[2px] text-[var(--muted-foreground)] whitespace-nowrap text-sm font-light tracking-wide select-none transition-all hover:bg-[var(--foreground)]/10 hover:scale-105"
                    >
                        {template}
                    </div>
                ))}
            </div>

            {/* Row 2 - Faster, Left */}
            <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] opacity-40">
                {[...row2, ...row2, ...row2, ...row2].map((template, i) => (
                    <div
                        key={`r2-${i}`}
                        className="mx-3 px-5 py-2 rounded-xl border border-[var(--foreground)]/5 bg-[var(--foreground)]/5 backdrop-blur-[2px] text-[var(--muted-foreground)] whitespace-nowrap text-sm font-light tracking-wide select-none transition-all hover:bg-[var(--foreground)]/10 hover:scale-105"
                    >
                        {template}
                    </div>
                ))}
            </div>

            {/* Innovative CTA Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="p-8 bg-gradient-to-b from-transparent via-[var(--background)]/80 to-transparent backdrop-blur-[1px] w-full flex justify-center">
                    <Link
                        href={user ? ROUTES.browse : ROUTES.login}
                        className="pointer-events-auto group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--foreground)]/5 backdrop-blur-md text-[var(--foreground)] text-sm font-medium transition-all duration-300 hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)] hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <span>Explore Templates</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style jsx>{`
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-right {
          animation: scrollRight 60s linear infinite;
        }
        .animate-scroll-left {
          animation: scrollLeft 50s linear infinite;
        }
      `}</style>
        </div>
    );
}

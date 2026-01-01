export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Hero Skeleton */}
            <div className="space-y-2">
                <div className="h-8 w-64 bg-[var(--muted)] rounded-lg"></div>
                <div className="h-4 w-96 bg-[var(--muted)]/60 rounded-lg"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card p-6 h-[148px] space-y-2">
                        <div className="p-3 bg-[var(--muted)] rounded-xl w-12 h-12"></div>
                        <div className="space-y-1 pt-2">
                            <div className="h-4 w-24 bg-[var(--muted)] rounded"></div>
                            <div className="h-7 w-16 bg-[var(--muted)]/80 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Activity Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-32 bg-[var(--muted)] rounded"></div>
                    <div className="h-4 w-16 bg-[var(--muted)]/60 rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-5 h-[160px] flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div className="h-5 w-32 bg-[var(--muted)] rounded"></div>
                                <div className="h-5 w-16 bg-[var(--muted)]/60 rounded"></div>
                            </div>
                            <div className="h-16 w-full bg-[var(--muted)]/30 rounded"></div>
                            <div className="mt-auto pt-3">
                                <div className="h-3 w-20 bg-[var(--muted)] rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { createSupabaseServer } from "@/lib/supabase/server";
import { getTemplates } from "@/lib/db/templates";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const templates = await getTemplates();

  const recentTemplates = templates.slice(0, 4);
  const totalTemplates = templates.length;
  // Mock stats
  const totalGenerated = templates.reduce((acc, t) => acc + (t.length === "Detailed" ? 500 : 200), 0);
  const hoursSaved = (totalGenerated / 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Hello, {user?.user_metadata?.full_name?.split(' ')[0] || "Student"}
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] mt-2">
          Ready to crush your applications today?
        </p>
      </div>

      {/* Bento Grid Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Main Action - Large Card */}
        <Link href="/" className="md:col-span-2 group">
          <div className="glass-card h-full p-8 flex flex-col justify-between relative overflow-hidden bg-[var(--foreground)] border-none text-[var(--background)] hover:scale-[1.01] transition-transform duration-300">
            <div className="relative z-10 space-y-4">
              <div className="p-3 bg-[var(--background)]/20 backdrop-blur-md rounded-2xl w-fit">
                <svg className="w-8 h-8 text-[var(--background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[var(--background)]">Create New Email</h2>
                <p className="text-[var(--background)]/80 mt-1 max-w-sm">Generate a perfect cold email tailored to any job description in seconds.</p>
              </div>
            </div>

            {/* Decorative Pattern */}
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[var(--background)]/10 rounded-full blur-3xl group-hover:bg-[var(--background)]/20 transition-all duration-500"></div>
            <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-0">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--background)] text-[var(--foreground)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
            </div>
          </div>
        </Link>

        {/* Stats Column */}
        <div className="space-y-6">
          <div className="glass-card p-6 flex flex-col justify-center gap-2 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Drafts</p>
              <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-4xl font-bold text-[var(--foreground)]">{totalTemplates}</p>
          </div>

          <div className="glass-card p-6 flex flex-col justify-center gap-2 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Hours Saved</p>
              <svg className="w-5 h-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-4xl font-bold text-[var(--foreground)]">~{hoursSaved}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <h3 className="text-xl font-bold text-[var(--foreground)]">Recent Activity</h3>
          <Link href={ROUTES.templates} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">View All &rarr;</Link>
        </div>

        {recentTemplates.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-16 h-16 bg-[var(--muted)] rounded-2xl mx-auto flex items-center justify-center text-[var(--muted-foreground)] mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-[var(--muted-foreground)]">You haven't generated any emails yet.</p>
            <Link href="/" className="text-[var(--foreground)] font-bold hover:underline">Start your first draft</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTemplates.map((t) => (
              <Link key={t.id} href={`/dashboard/templates/${t.id}`} className="group">
                <div className="glass-card p-5 h-full flex flex-col gap-4 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-[var(--muted)] text-[var(--foreground)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-1 rounded">
                      {t.tone}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[var(--foreground)] truncate group-hover:underline decoration-1 underline-offset-4">{t.name}</h4>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1 truncate">{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>

                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-auto">
                    {t.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

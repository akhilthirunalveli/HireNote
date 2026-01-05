import { LandingNavbar } from "@/components/home/LandingNavbar";
import TemplateInput from "@/components/template/TemplateInput";
import { createSupabaseServer } from "@/lib/supabase/server";
import { StarsBackground } from "@/components/home/StarsBackground";
import { TemplateScroller } from "@/components/home/TemplateScroller";

export default async function HomePage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-gray-200 dark:selection:bg-gray-800 relative overflow-hidden">
      <StarsBackground />
      <LandingNavbar user={user} />

      <main className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 relative z-10">

        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            For Students & Job Seekers
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
            Land your dream job with <span className="underline decoration-4 decoration-wavy decoration-blue-500 dark:decoration-blue-400 underline-offset-8">cold emails</span>
          </h1>

          <p className="text-xl md:text-2xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
            Stop sending generic messages. Generate tailored, outreachy emails to recruiters and founders in seconds using AI.
          </p>
        </div>

        {/* Live Demo / Interaction */}
        <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-200 dark:from-gray-800 dark:to-gray-800 opacity-20 blur-3xl rounded-full -z-10 transform scale-75"></div>
          <TemplateInput mode="create" user={user} />
        </div>
      </main>

      <div className="py-1">
        <TemplateScroller user={user} />
      </div>

      <footer className="py-6 text-center text-sm text-muted bg-[var(--background)] relative z-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[var(--muted-foreground)]">
            Built by a student, for students.
          </p>
          <div className="flex items-center gap-6 font-medium text-[var(--muted-foreground)]">
            <span>Free Forever</span>
            <span>Open Source</span>
            <a href="https://github.com/akhilthirunalveli" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

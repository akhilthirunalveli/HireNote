import { createSupabaseServer } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { MobileMenu } from "@/components/dashboard/MobileMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[var(--background)] selection:bg-gray-200 dark:selection:bg-gray-800">
      {/* Desktop Sidebar */}
      <DashboardSidebar userEmail={user?.email} />

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--foreground)] flex items-center justify-center text-[var(--background)] font-bold shadow-sm">
            H
          </div>
          <span className="font-outfit font-bold text-lg text-[var(--foreground)]">HireNote</span>
        </div>
        <MobileMenu />
      </div>

      {/* Main Content */}
      <main className="md:pl-64 min-h-screen transition-[padding] duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

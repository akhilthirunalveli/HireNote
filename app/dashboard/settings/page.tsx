import { createSupabaseServer } from "@/lib/supabase/server";
import { SettingsClient } from "./_components/SettingsClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, username")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--muted-foreground)]">Manage your account settings and preferences.</p>
      </div>

      <SettingsClient
        userEmail={user.email || ""}
        initialProfile={profile}
      />
    </div>
  );
}

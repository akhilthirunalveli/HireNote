import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";
import { ROUTES } from "@/lib/constants";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || ROUTES.dashboard;

  if (code) {
    const supabase = await createSupabaseServer();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}

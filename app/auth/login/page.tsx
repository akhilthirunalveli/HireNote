"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { toast } from "sonner";


import { Logo } from "@/components/ui/Logo";


export default function LoginPage() {
  const [next, setNext] = useState<string>(ROUTES.dashboard);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setNext(params.get("next") || ROUTES.dashboard);
  }, []);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 3, [email]);

  const login = async () => {
    setStatus("sending");
    setError(null);
    try {
      const redirectTo = `${window.location.origin}${ROUTES.callback}?next=${encodeURIComponent(
        next
      )}`;

      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo },
      });

      if (error) throw new Error(error.message);
      setStatus("sent");
      toast.success("Magic link sent! Check your inbox.");
    } catch (e) {
      console.error(e);
      const msg = (e as Error).message;
      setError(msg);
      setStatus("error");
      toast.error(msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[var(--background)] animate-in fade-in duration-500">
      <div className="w-full max-w-sm space-y-8">

        {/* Header / Logo */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" className="group">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <Logo className="w-16 h-16 text-[var(--foreground)]" />
            </div>
          </Link>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">Welcome back</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Enter your email to access your workspace</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="space-y-4">
          <div className="space-y-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="glass-input w-full px-4 py-3 text-sm text-center"
              type="email"
              autoComplete="email"
              disabled={status === "sending" || status === "sent"}
            />
          </div>

          <button
            onClick={login}
            disabled={!canSubmit || status === "sending" || status === "sent"}
            className="primary-button w-full py-3 text-sm font-medium disabled:opacity-70"
          >
            {status === "sending" ? "Sending magic link..." : (status === "sent" ? "Check your email!" : "Sign in with Email")}
          </button>

          {/* Feedback Messages */}
          <div className="min-h-[20px] text-center">
            {status === "sent" && (
              <p className="text-sm text-green-600 dark:text-green-400 animate-in slide-in-from-bottom-1">
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 animate-in slide-in-from-bottom-1">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

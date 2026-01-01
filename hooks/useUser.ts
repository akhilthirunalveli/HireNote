
"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type UseUserState =
	| { loading: true; user: null; error: null }
	| { loading: false; user: User | null; error: string | null };

export function useUser() {
	const [state, setState] = useState<UseUserState>({
		loading: true,
		user: null,
		error: null,
	});

	useEffect(() => {
		let cancelled = false;

		let supabase: ReturnType<typeof getSupabaseBrowserClient> | null = null;
		try {
			supabase = getSupabaseBrowserClient();
		} catch (e) {
			setState({
				loading: false,
				user: null,
				error: (e as Error).message,
			});
			return;
		}

		const load = async () => {
			try {
				const { data, error } = await supabase!.auth.getUser();
				if (cancelled) return;
				if (error) {
					setState({ loading: false, user: null, error: error.message });
					return;
				}
				setState({ loading: false, user: data.user, error: null });
			} catch (e) {
				if (cancelled) return;
				setState({ loading: false, user: null, error: (e as Error).message });
			}
		};

		load();

		const { data: sub } = supabase!.auth.onAuthStateChange(
			(_event: AuthChangeEvent, session: Session | null) => {
			setState({ loading: false, user: session?.user ?? null, error: null });
			}
		);

		return () => {
			cancelled = true;
			sub.subscription.unsubscribe();
		};
	}, []);

	const actions = useMemo(
		() => ({
			signOut: async () => {
				const supabase = getSupabaseBrowserClient();
				await supabase.auth.signOut();
			},
		}),
		[]
	);

	return { ...state, ...actions };
}

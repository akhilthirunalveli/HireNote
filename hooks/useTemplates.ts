
"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Template } from "@/types/template";

type TemplatesState = {
	loading: boolean;
	templates: Template[];
	error: string | null;
};

export function useTemplates() {
	const [state, setState] = useState<TemplatesState>({
		loading: true,
		templates: [],
		error: null,
	});

	const refresh = useCallback(async () => {
		setState((s) => ({ ...s, loading: true, error: null }));

		let supabase: ReturnType<typeof getSupabaseBrowserClient>;
		try {
			supabase = getSupabaseBrowserClient();
		} catch (e) {
			setState({ loading: false, templates: [], error: (e as Error).message });
			return;
		}

		const { data, error } = await supabase
			.from("templates")
			.select("id,name,content")
			.order("name", { ascending: true });

		if (error) {
			setState({ loading: false, templates: [], error: error.message });
			return;
		}

		setState({ loading: false, templates: (data ?? []) as Template[], error: null });
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const createTemplate = useCallback(
		async (template: Omit<Template, "id">) => {
			const supabase = getSupabaseBrowserClient();
			const { error } = await supabase.from("templates").insert(template);
			if (error) throw new Error(error.message);
			await refresh();
		},
		[refresh]
	);

	const updateTemplate = useCallback(
		async (id: string, patch: Partial<Omit<Template, "id">>) => {
			const supabase = getSupabaseBrowserClient();
			const { error } = await supabase.from("templates").update(patch).eq("id", id);
			if (error) throw new Error(error.message);
			await refresh();
		},
		[refresh]
	);

	const deleteTemplate = useCallback(
		async (id: string) => {
			const supabase = getSupabaseBrowserClient();
			const { error } = await supabase.from("templates").delete().eq("id", id);
			if (error) throw new Error(error.message);
			await refresh();
		},
		[refresh]
	);

	return { ...state, refresh, createTemplate, updateTemplate, deleteTemplate };
}


export const ROUTES = {
	home: "/",
	dashboard: "/dashboard",
	templates: "/dashboard/templates",
	browse: "/dashboard/browse",
	settings: "/dashboard/settings",
	login: "/auth/login",
	callback: "/auth/callback",
} as const;

export const ENV = {
	supabaseUrl: "NEXT_PUBLIC_SUPABASE_URL",
	supabaseAnonKey: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
	supabaseServiceRoleKey: "SUPABASE_SERVICE_ROLE_KEY",
	geminiApiKey: "GEMINI_API_KEY",
} as const;

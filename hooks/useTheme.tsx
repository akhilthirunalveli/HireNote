"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: ThemeMode;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: ThemeMode;
	resolvedTheme: "dark" | "light";
	setTheme: (theme: ThemeMode) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	resolvedTheme: "light",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "hirenote:theme",
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<ThemeMode>(defaultTheme);
	const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("light");

	useEffect(() => {
		const stored = localStorage.getItem(storageKey) as ThemeMode | null;
		if (stored) {
			setTheme(stored);
		}
	}, [storageKey]);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			const systemTheme = systemIsDark ? "dark" : "light";
			setResolvedTheme(systemTheme);
			root.classList.add(systemTheme);
			return;
		}

		setResolvedTheme(theme);
		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		resolvedTheme,
		setTheme: (newTheme: ThemeMode) => {
			const root = window.document.documentElement;

			if (!document.startViewTransition) {
				localStorage.setItem(storageKey, newTheme);
				setTheme(newTheme);
				return;
			}

			const transition = document.startViewTransition(() => {
				localStorage.setItem(storageKey, newTheme);
				setTheme(newTheme);

				// Force manual DOM update to ensure View Transition captures the change immediately
				// (React's useEffect is too late for the snapshot)
				const root = window.document.documentElement;
				root.classList.remove("light", "dark");
				if (newTheme === "system") {
					const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
					root.classList.add(systemTheme);
				} else {
					root.classList.add(newTheme);
				}
			});

			transition.ready.then(() => {
				document.documentElement.animate(
					{
						clipPath: [
							`inset(0 0 100% 0)`,
							`inset(0 0 0 0)`,
						],
					},
					{
						duration: 700,
						easing: "ease-out",
						pseudoElement: "::view-transition-new(root)",
					}
				);
			});
		},
	};

	return (
		<ThemeProviderContext.Provider value={value} >
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};

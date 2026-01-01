
type GeminiGenerateParams = {
	prompt: string;
	apiKey?: string;
};

type GeminiPart = { text?: string };
type GeminiCandidate = { content?: { parts?: GeminiPart[] } };
type GeminiResponse = { candidates?: GeminiCandidate[] };

/**
 * Minimal, dependency-free wrapper.
 *
 * If `GEMINI_API_KEY` is not set, this returns `null` so routes can fall back.
 */
export async function geminiGenerateText(
	{ prompt, apiKey: userApiKey }: GeminiGenerateParams
): Promise<string | null> {
	const apiKey = userApiKey || process.env.GEMINI_API_KEY;
	if (!apiKey) return null;

	// Uses the public REST endpoint to avoid adding extra SDK deps.
	const url =
		"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

	const res = await fetch(`${url}?key=${encodeURIComponent(apiKey)}`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{ role: "user", parts: [{ text: prompt }] }],
			}),
		}
	);

	if (!res.ok) {
		const details = await res.text().catch(() => "");
		throw new Error(`Gemini request failed (${res.status}): ${details}`);
	}

	const data = (await res.json()) as GeminiResponse;
	const text =
		data.candidates?.[0]?.content?.parts
			?.map((p) => p.text)
			.filter((t): t is string => Boolean(t))
			.join("") ??
		"";

	return typeof text === "string" && text.length > 0 ? text : null;
}

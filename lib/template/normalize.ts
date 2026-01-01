
/**
 * Normalizes common placeholder syntaxes into `{placeholder}`.
 * - Converts `{{name}}` -> `{name}`
 * - Normalizes newlines
 */
export function normalizeTemplate(input: string): string {
	const text = input.replace(/\r\n/g, "\n");
	// Convert double-brace placeholders to single-brace placeholders.
	return text.replace(/\{\{\s*(\w+)\s*\}\}/g, "{$1}");
}

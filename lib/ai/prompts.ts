
export function templateGenerationPrompt(userPrompt: string) {
	return [
		"You are an expert career coach helping students and job seekers write effective cold emails to recruiters and hiring managers.",
		"Write a short, professional cold email template based on the user's request.",
		"Return ONLY the template text. Use placeholders in {snake_case} (e.g. {hiring_manager_name}, {company_name}, {job_role}).",
		"Avoid markdown fences.",
		"",
		`User request: ${userPrompt}`,
	].join("\n");
}

export function improveTextPrompt(text: string, instruction?: string) {
	return [
		"Improve the following text for clarity and professionalism.",
		"Keep the meaning the same.",
		"Return ONLY the improved text.",
		instruction ? `Additional instruction: ${instruction}` : "",
		"",
		text,
	]
		.filter(Boolean)
		.join("\n");
}

export function detectPlaceholdersPrompt(text: string) {
	return [
		"Analyze the following message and replace specific details (names, dates, companies, job titles, locations) with snake_case placeholders (e.g., {name}, {job_title}).",
		"Return ONLY the rewritten text with placeholders.",
		"Do not change the structure or meaning of the message.",
		"",
		`Message: ${text}`,
	].join("\n");
}

export function refineMessagePrompt(text: string, tone: string, length: string) {
	return [
		`Rewrite the following message to be ${tone} in tone and ${length} in length.`,
		"Keep the core meaning and any specific details (like names, companies) exactly the same.",
		"Return ONLY the rewritten message.",
		"",
		`Message: ${text}`,
	].join("\n");
}

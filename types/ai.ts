
export type AiProvider = "gemini";

export interface GenerateTemplateRequest {
	prompt: string;
}

export interface GenerateTemplateResponse {
	template: string;
	provider?: AiProvider;
}

export interface ImproveTextRequest {
	text: string;
	instruction?: string;
}

export interface ImproveTextResponse {
	text: string;
	provider?: AiProvider;
}

export interface BatchGenerateRequest {
	template: string;
	rows: Record<string, string>[];
}

export interface BatchGenerateResponse {
	outputs: string[];
}

export interface ApiErrorResponse {
	error: string;
}

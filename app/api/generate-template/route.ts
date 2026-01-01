import { NextResponse } from "next/server";
import { geminiGenerateText } from "@/lib/ai/gemini";
import { templateGenerationPrompt } from "@/lib/ai/prompts";

export async function POST(req: Request) {
  const { prompt } = (await req.json().catch(() => ({}))) as {
    prompt?: string;
  };

  const userPrompt = (prompt ?? "").trim();

  if (userPrompt) {
    const ai = await geminiGenerateText({
      prompt: templateGenerationPrompt(userPrompt),
    }).catch(() => null);
    if (ai) return NextResponse.json({ template: ai, provider: "gemini" });
  }

  // Fallback (no API key or no prompt)
  const template = `Hello {name},\n\nWe are pleased to inform you about the {role} opportunity at {company}.\nYour job ID is {job_id}.\n\nRegards,\n{sender}\n`;
  return NextResponse.json({ template, provider: "fallback" });
}

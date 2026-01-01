import { NextResponse } from "next/server";
import { geminiGenerateText } from "@/lib/ai/gemini";
import { improveTextPrompt } from "@/lib/ai/prompts";

export async function POST(req: Request) {
  const { text, instruction } = (await req.json().catch(() => ({}))) as {
    text?: string;
    instruction?: string;
  };

  const input = (text ?? "").trim();
  if (!input) return NextResponse.json({ error: "text is required" }, { status: 400 });

  const ai = await geminiGenerateText({
    prompt: improveTextPrompt(input, instruction),
  });

  return NextResponse.json({ text: ai ?? input, provider: ai ? "gemini" : "fallback" });
}

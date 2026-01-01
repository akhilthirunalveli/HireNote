import { NextResponse } from "next/server";
import { extractPlaceholders } from "@/lib/template/parse";
import { normalizeTemplate } from "@/lib/template/normalize";

export async function POST(req: Request) {
  const { text } = (await req.json().catch(() => ({}))) as { text?: string };
  const normalized = normalizeTemplate(text ?? "");
  const placeholders = extractPlaceholders(normalized);
  return NextResponse.json({ placeholders });
}

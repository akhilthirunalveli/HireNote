import { NextResponse } from "next/server";
import { normalizeTemplate } from "@/lib/template/normalize";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    template?: string;
    rows?: Record<string, string>[];
  };

  const template = normalizeTemplate(body.template ?? "");
  const rows = Array.isArray(body.rows) ? body.rows : [];

  if (!template) {
    return NextResponse.json({ error: "template is required" }, { status: 400 });
  }

  const outputs = rows.map((row) => {
    let result = template;
    for (const [key, value] of Object.entries(row ?? {})) {
      result = result.replaceAll(`{${key}}`, value ?? "");
    }
    return result;
  });

  return NextResponse.json({ outputs });
}

export function extractPlaceholders(text: string): string[] {
  const regex = /\{(\w+)\}/g;
  const found = new Set<string>();
  let match;

  while ((match = regex.exec(text))) {
    found.add(match[1]);
  }

  return Array.from(found);
}

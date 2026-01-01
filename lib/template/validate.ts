export function validateFields(
  placeholders: string[],
  values: Record<string, string>
) {
  return placeholders.filter((p) => !values[p]);
}

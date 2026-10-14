/**
 * Input sanitization utility to prevent XSS and strip dangerous characters
 */
export function sanitizeString(input: string): string {
  if (!input) return "";
  return input
    .replace(/[<>]/g, "") // Strip HTML tags
    .trim();
}

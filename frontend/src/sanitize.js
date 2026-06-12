import DOMPurify from "dompurify";

// Use this function whenever displaying any user generated content
export function sanitize(input) {
  if (!input) return "";
  return DOMPurify.sanitize(input);
}
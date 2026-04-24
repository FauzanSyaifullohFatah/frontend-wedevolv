import { BASE_URL } from "./api";

export function sanitizeUsername(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "")
}

export function formatDateIndo(dateString) {
  const date = new Date(dateString);

  return date
    .toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");
}

export function formatDateEng(dateString) {
  const date = new Date(dateString);

  return date
    .toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(",", "");
}

export function getImageUrl(src) {
  if (!src) return null;

  const baseUrl = BASE_URL;
  return src.startsWith("http") ? src : `${baseUrl}${src}`;
}
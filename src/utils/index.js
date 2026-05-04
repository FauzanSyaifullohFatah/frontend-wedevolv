import { BASE_URL } from "./api";

export function sanitizeUsername(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "")
}

export function formatDateIn(dateString) {
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

export function formatDateEn(dateString) {
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

export function portfolioProgress({
  profilePict,
  isVerified,
  role,
  country,
  phoneNumber,
  whatsapp,
  linkedin,
  github,
  summary,
  projectCount = 0,
  certificateCount = 0,
}) {
  let progress = 0;
  const missing = [];

  // ===== BASIC INFO (30%) =====
  if (profilePict) {
    progress += 5;
  } else {
    missing.push("Tambahkan profile picture");
  }

  if (isVerified) {
    progress += 5;
  } else {
    missing.push("Email belum diverifikasi");
  }

  if (role) {
    progress += 5;
  } else {
    missing.push("Role belum diisi");
  }

  if (country) {
    progress += 5;
  } else {
    missing.push("Country belum diisi");
  }

  if (phoneNumber) {
    progress += 2.5;
  } else {
    missing.push("Phone number belum diisi");
  }

  if (whatsapp) {
    progress += 2.5;
  } else {
    missing.push("WhatsApp belum diisi");
  }

  if (linkedin) {
    progress += 2.5;
  } else {
    missing.push("LinkedIn belum diisi");
  }

  if (github) {
    progress += 2.5;
  } else {
    missing.push("GitHub belum diisi");
  }

  // ===== SUMMARY (20%) =====
  if (summary && summary.trim().length >= 50) {
    progress += 20;
  } else {
    missing.push("Professional summary minimal 50 karakter");
  }

  // ===== PROJECTS (25%) =====
  const projectProgress = Math.min(projectCount / 3, 1) * 25;
  progress += projectProgress;

  if (projectCount < 3) {
    missing.push(`Tambah ${3 - projectCount} project lagi`);
  }

  // ===== CERTIFICATES (25%) =====
  const certificateProgress = Math.min(certificateCount / 3, 1) * 25;
  progress += certificateProgress;

  if (certificateCount < 3) {
    missing.push(`Tambah ${3 - certificateCount} certificate lagi`);
  }

  return {
    progress: Math.round(progress),
    missingFields: missing,
  };
}
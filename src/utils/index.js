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
  linkedin,
  github,
  summary,
  projectCount = 0,
  t,
}) {
  let progress = 0;
  const missing = [];

  // ===== BASIC INFO (40%) =====
  if (profilePict) {
    progress += 8;
  } else {
    missing.push(t("portfolioProgress.addProfilePict"));
  }

  if (isVerified) {
    progress += 8;
  } else {
    missing.push(t("portfolioProgress.emailNotVerif"));
  }

  if (role) {
    progress += 8;
  } else {
    missing.push(t("portfolioProgress.role"));
  }

  if (country) {
    progress += 6;
  } else {
    missing.push(t("portfolioProgress.country"));
  }

  if (linkedin || github) {
    progress += 10;
  } else {
    missing.push(t("portfolioProgress.linkedinOrGithub"));
  }

  // ===== SUMMARY (25%) =====
  if (summary && summary.trim().length >= 50) {
    progress += 25;
  } else {
    missing.push(t("portfolioProgress.summary"));
  }

  // ===== PROJECTS (35%) =====
  const projectProgress = projectCount >= 1 ? 35 : 0;
  progress += projectProgress;

  if (projectCount < 1) {
    missing.push(t("portfolioProgress.addProject")); 
  }

  return {
    progress: Math.round(progress),
    missingFields: missing,
  };
}

export const getCertificateStatus = (expirationDate, t) => {
  if (!expirationDate) return t('active');

  const today = new Date();
  const exp = new Date(expirationDate);
  
  const isExpired = exp < today;
  return isExpired ? t('statusCertificate.not_active') : t('statusCertificate.active');
};
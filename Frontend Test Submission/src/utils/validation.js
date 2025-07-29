import { logger } from "./logger";

export function validateUrl(url) {
  try {
    new URL(url);
    return null;
  } catch (e) {
    logger.warn("Invalid URL provided", { url });
    return "Please enter a valid URL (e.g., https://example.com)";
  }
}

export function validateShortCode(shortCode, existingShortCodes) {
  if (existingShortCodes.includes(shortCode)) {
    logger.warn("Short code collision detected", { shortCode });
    return "This short code is already in use";
  }

  if (!/^[a-zA-Z0-9_-]{4,20}$/.test(shortCode)) {
    logger.warn("short code format is Invalid", { shortCode });
    return "Short code must be 4-20 characters long and contain only letters, numbers, or underscores";
  }

  return null;
}

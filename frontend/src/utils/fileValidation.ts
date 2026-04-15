const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg"];

export const getFileValidationError = (file: File): string | null => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return "Only PNG, JPG, and JPEG files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File size must be 10MB or less.";
  }

  return null;
};

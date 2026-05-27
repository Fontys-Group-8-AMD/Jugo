const MAX_FILE_SIZE_MB = 10;
const BYTES_PER_MB = 1024 * 1024;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * BYTES_PER_MB;

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"] as const;

export const getFileValidationError = (file: File): string | null => {
  if (
    !ALLOWED_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_FILE_TYPES)[number],
    )
  ) {
    return "Only PNG, JPG, and JPEG files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File size must be ${MAX_FILE_SIZE_MB}MB or less.`;
  }

  return null;
};

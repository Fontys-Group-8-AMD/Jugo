import { ImageIcon, X } from "lucide-react";

interface UploadZoneProps {
  selectedFile: File | null;
  errorMessage: string;
  onRemoveFile: () => void;
}

const formatFileSize = (bytes: number) => {
  const kb = bytes / 1024;
  const mb = bytes / (1024 * 1024);

  if (mb >= 1) {
    return `${mb.toFixed(2)} MB`;
  }

  return `${kb.toFixed(0)} KB`;
};

const UploadZone = ({
  selectedFile,
  errorMessage,
  onRemoveFile,
}: UploadZoneProps) => {
  return (
    <section className="flex min-h-[26rem] items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-white)] px-6 py-10 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-primary)]/70">
          <ImageIcon size={30} strokeWidth={1.8} />
        </div>

        <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
          Drop your dashboard image here
        </h2>

        {!selectedFile && (
          <p className="mt-3 text-base text-[var(--color-primary)]/70">
            PNG, JPG, or JPEG up to 10MB
          </p>
        )}

        {selectedFile && (
          <div className="mt-4 flex flex-col items-center gap-3">
            <div>
              <p className="text-base font-medium text-[var(--color-dark)]">
                Selected file: {selectedFile.name}
              </p>
              <p className="mt-1 text-sm text-[var(--color-primary)]/70">
                Size: {formatFileSize(selectedFile.size)}
              </p>
            </div>

            <button
              type="button"
              onClick={onRemoveFile}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-dark)] transition hover:bg-[var(--color-background)]"
            >
              <X size={16} strokeWidth={2} />
              Remove file
            </button>
          </div>
        )}

        {errorMessage && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default UploadZone;

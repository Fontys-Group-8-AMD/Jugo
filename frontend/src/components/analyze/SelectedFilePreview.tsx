import { X } from "lucide-react";

interface SelectedFilePreviewProps {
  selectedFile: File;
  previewUrl: string;
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

const SelectedFilePreview = ({
  selectedFile,
  previewUrl,
  onRemoveFile,
}: SelectedFilePreviewProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Selected dashboard preview"
          className="h-36 w-auto max-w-full rounded-xl border border-[var(--color-border)] object-cover shadow-sm"
        />
      )}

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
  );
};

export default SelectedFilePreview;

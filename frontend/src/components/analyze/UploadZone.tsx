import EmptyUploadState from "./EmptyUploadState";
import SelectedFilePreview from "./SelectedFilePreview";

interface UploadZoneProps {
  selectedFile: File | null;
  previewUrl: string;
  errorMessage: string;
  isDragActive: boolean;
  onDragEnter: (event: React.DragEvent<HTMLElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  onRemoveFile: () => void;
}

const UploadZone = ({
  selectedFile,
  previewUrl,
  errorMessage,
  isDragActive,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveFile,
}: UploadZoneProps) => {
  const uploadZoneClassName = `flex min-h-[26rem] items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 shadow-sm transition ${
    isDragActive
      ? "border-[var(--color-accent)] bg-[var(--color-background)]"
      : "border-[var(--color-border)] bg-[var(--color-white)]"
  }`;

  return (
    <section
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={uploadZoneClassName}
    >
      <div className="flex flex-col items-center justify-center text-center">
        {selectedFile ? (
          <SelectedFilePreview
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onRemoveFile={onRemoveFile}
          />
        ) : (
          <EmptyUploadState isDragActive={isDragActive} />
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

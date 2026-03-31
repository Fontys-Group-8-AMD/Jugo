import { ImageIcon } from "lucide-react";

interface EmptyUploadStateProps {
  isDragActive: boolean;
}

const EmptyUploadState = ({ isDragActive }: EmptyUploadStateProps) => {
  return (
    <>
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-primary)]/70">
        <ImageIcon size={30} strokeWidth={1.8} />
      </div>

      <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
        Drop your dashboard image here
      </h2>

      {isDragActive ? (
        <p className="mt-3 text-base font-medium text-[var(--color-accent)]">
          Release to upload your image
        </p>
      ) : (
        <p className="mt-3 text-base text-[var(--color-primary)]/70">
          PNG, JPG, or JPEG up to 10MB
        </p>
      )}
    </>
  );
};

export default EmptyUploadState;

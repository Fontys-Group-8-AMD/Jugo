import { ImageIcon } from "lucide-react";

interface UploadZoneProps {
  selectedFile: File | null;
  errorMessage: string;
}

const UploadZone = ({ selectedFile, errorMessage }: UploadZoneProps) => {
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
          <p className="mt-3 text-base font-medium text-[var(--color-dark)]">
            Selected file: {selectedFile.name}
          </p>
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

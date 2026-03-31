import { Upload } from "lucide-react";

const UploadZone = () => {
  return (
    <section className="rounded-3xl border border-dashed border-[var(--color-primary)]/30 bg-[var(--color-white)] p-8 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-background)] text-[var(--color-primary)]">
          <Upload size={28} strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
          Upload dashboard screenshot
        </h2>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-primary)]/80">
          Drag and drop your dashboard image here, or choose a file from your
          device to begin the compliance analysis.
        </p>

        <button
          type="button"
          className="mt-6 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
        >
          Choose File
        </button>

        <p className="mt-4 text-sm text-[var(--color-primary)]/70">
          Supported formats: PNG, JPG, JPEG
        </p>
      </div>
    </section>
  );
};

export default UploadZone;

import { ImageIcon } from "lucide-react";

const UploadZone = () => {
  return (
    <section className="rounded-2xl border-2 border-dashed border-[var(--color-border)] bg-transparent px-8 py-20 md:px-10 md:py-24">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--color-surface-muted)] text-[var(--color-primary)]/60">
          <ImageIcon size={36} strokeWidth={2} />
        </div>

        <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
          Drop your dashboard image here
        </h2>

        <p className="mt-3 text-base text-[var(--color-primary)]/70">
          PNG, JPG, or SVG up to 10MB
        </p>
      </div>
    </section>
  );
};

export default UploadZone;

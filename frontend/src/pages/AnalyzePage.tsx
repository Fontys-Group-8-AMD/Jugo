import UploadZone from "../components/analyze/UploadZone";
import RuleInfoCard from "../components/analyze/RuleInfoCard";

const AnalyzePage = () => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-dark)] md:text-4xl">
            Analyze Dashboard
          </h1>

          <p className="mt-3 text-base text-[var(--color-primary)]/80 md:text-lg">
            Upload a dashboard screenshot to check IBCS UN 3.2 compliance.
          </p>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.55fr_1fr] xl:items-start">
          <div>
            <UploadZone />

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] px-6 py-4 text-base font-semibold text-[var(--color-dark)] transition hover:bg-[var(--color-surface-muted)]"
              >
                <span className="text-lg">↑</span>
                Upload Visualization
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--color-accent)] px-6 py-4 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
              >
                Run AI Analysis
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>

          <RuleInfoCard />
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;

import UploadZone from "../components/analyze/UploadZone";
import RuleInfoCard from "../components/analyze/RuleInfoCard";

const AnalyzePage = () => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-[var(--color-dark)] md:text-5xl">
            Analyze Your Dashboard
          </h1>

          <p className="mt-4 text-base leading-8 text-[var(--color-primary)]/80 md:text-lg">
            Upload a dashboard screenshot and run an AI-powered compliance check
            against the selected IBCS rule.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <UploadZone />
          <RuleInfoCard />
        </div>

        <div className="mt-10 flex justify-center lg:justify-end">
          <button
            type="button"
            className="rounded-xl bg-[var(--color-accent)] px-8 py-4 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
          >
            Run AI Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnalyzePage;

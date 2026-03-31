import { Link } from "react-router-dom";

const ResultsPage = () => {
  return (
    <section className="flex flex-1 items-center justify-center bg-[var(--color-background)] px-6 py-12">
      <div className="w-full max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-white)] p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-[var(--color-dark)] md:text-4xl">
          No analysis available yet
        </h1>

        <p className="mt-4 text-base leading-8 text-[var(--color-primary)]/80">
          Upload a dashboard and run an AI analysis first to see compliance
          results here.
        </p>

        <Link
          to="/analyze"
          className="mt-8 inline-flex rounded-xl bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-[var(--color-white)] transition hover:opacity-90"
        >
          Go to Analyze
        </Link>
      </div>
    </section>
  );
};

export default ResultsPage;

import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[linear-gradient(90deg,var(--color-dark)_0%,var(--color-primary)_100%)] px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 py-2 text-sm font-medium text-[var(--color-accent)]">
          Rule UN 3.2
        </span>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-[var(--color-white)] md:text-6xl">
          AI-Powered IBCS Dashboard Compliance Checker
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-white)]/80 md:text-xl">
          Upload your dashboard screenshots and receive instant feedback on
          scenario compliance. Ensure your visualizations follow the IBCS
          &quot;Unify Scenarios&quot; standard.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/analyze"
            className="rounded-xl bg-[var(--color-accent)] px-8 py-4 text-base font-semibold text-[var(--color-white)] shadow-lg transition hover:opacity-90"
          >
            Analyze Dashboard
          </Link>

          <button className="rounded-xl border border-[var(--color-accent)] px-8 py-4 text-base font-semibold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-white)]">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

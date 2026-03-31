import type { AnalysisIssue } from "../../data/mockAnalysisResult";

interface IssuesDetectedCardProps {
  issues: AnalysisIssue[];
}

const IssuesDetectedCard = ({ issues }: IssuesDetectedCardProps) => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
        Issues Detected
      </h2>

      <div className="mt-6 space-y-4">
        {issues.map((issue, index) => (
          <div
            key={issue.message}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-base leading-7 text-[var(--color-primary)]/85">
                {index + 1}. {issue.message}
              </p>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                  issue.severity === "high"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {issue.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IssuesDetectedCard;

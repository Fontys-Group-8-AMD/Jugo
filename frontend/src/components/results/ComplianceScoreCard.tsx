interface ComplianceScoreCardProps {
  score: number;
}

const ComplianceScoreCard = ({ score }: ComplianceScoreCardProps) => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
        Compliance Score
      </p>

      <div className="mt-5 flex items-end gap-3">
        <span className="text-5xl font-bold leading-none text-[var(--color-dark)]">
          {score}
        </span>
        <span className="text-2xl font-medium text-[var(--color-primary)]/80">
          / 100
        </span>
      </div>

      <div className="mt-8 h-3 w-full overflow-hidden rounded-full bg-[var(--color-border)]/50">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </section>
  );
};

export default ComplianceScoreCard;

interface ComplianceScoreCardProps {
  score: number;
}

const ComplianceScoreCard = ({ score }: ComplianceScoreCardProps) => {
  return (
    <section className="rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
        Prediction confidence
      </p>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-4xl font-bold leading-none text-[var(--color-dark)]">
          {score}
        </span>
        <span className="text-xl font-medium text-[var(--color-primary)]/80">
          / 100
        </span>
      </div>

      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]/50">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </section>
  );
};

export default ComplianceScoreCard;

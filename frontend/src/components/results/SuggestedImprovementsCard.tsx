interface SuggestedImprovementsCardProps {
  suggestions: string[];
}

const SuggestedImprovementsCard = ({
  suggestions,
}: SuggestedImprovementsCardProps) => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
        Suggested Improvements
      </h2>

      <div className="mt-6 space-y-5">
        {suggestions.map((suggestion, index) => (
          <div key={suggestion} className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-semibold text-[var(--color-white)]">
              {index + 1}
            </div>

            <p className="text-base leading-7 text-[var(--color-primary)]/85">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedImprovementsCard;

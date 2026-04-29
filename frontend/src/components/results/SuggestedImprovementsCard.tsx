interface SuggestedImprovementsCardProps {
  suggestions: string[];
}

const SuggestedImprovementsCard = ({
  suggestions,
}: SuggestedImprovementsCardProps) => {
  return (
    <section className="rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-[var(--color-dark)]">
        Suggested Improvements
      </h2>

      <div className="mt-4 space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={suggestion} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-semibold text-[var(--color-white)]">
              {index + 1}
            </div>

            <p className="text-sm leading-6 text-[var(--color-primary)]/85">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuggestedImprovementsCard;

interface SuggestedImprovementsCardProps {
  suggestions: string[];
  status: "compliant" | "non-compliant";
}

const SuggestedImprovementsCard = ({
  suggestions,
  status,
}: SuggestedImprovementsCardProps) => {
  const title =
    status === "compliant" ? "Validation Notes" : "Suggested Improvements";

  return (
    <section className="flex flex-1 flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-[var(--color-dark)]">
        {title}
      </h2>

      <div className="mt-4 flex-1 space-y-3">
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

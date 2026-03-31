import { useState } from "react";
import { Info } from "lucide-react";
import ScenarioLegend from "./ScenarioLegend";

const RuleInfoCard = () => {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
          IBCS Rule UN 3.2
        </h2>

        <button
          type="button"
          onClick={() => setShowExplanation((prev) => !prev)}
          aria-label="Toggle rule explanation"
          aria-expanded={showExplanation}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-accent)] transition hover:bg-[var(--color-background)]"
        >
          <Info size={18} strokeWidth={2} />
        </button>
      </div>

      {showExplanation && (
        <p className="mt-4 text-base leading-8 text-[var(--color-primary)]/80">
          The &quot;Unify Scenarios&quot; rule requires consistent visual
          encoding of data scenarios across all charts. Each scenario type must
          use a distinct, standardized visual pattern to avoid ambiguity.
        </p>
      )}

      <ScenarioLegend />
    </section>
  );
};

export default RuleInfoCard;

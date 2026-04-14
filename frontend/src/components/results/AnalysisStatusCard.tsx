import { AlertTriangle, Check } from "lucide-react";
import type { ScenarioCheck } from "../../types/analysisResult";

interface AnalysisStatusCardProps {
  status: "compliant" | "non-compliant";
  scenarioChecks: ScenarioCheck[];
}

const AnalysisStatusCard = ({
  status,
  scenarioChecks,
}: AnalysisStatusCardProps) => {
  const isCompliant = status === "compliant";
  const visibleScenarioChecks = scenarioChecks.filter((check) => check.present);

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
        Status
      </p>

      <div className="mt-5 flex items-center gap-3">
        {isCompliant ? (
          <Check className="text-emerald-500" size={28} strokeWidth={2.2} />
        ) : (
          <AlertTriangle
            className="text-amber-500"
            size={28}
            strokeWidth={2.2}
          />
        )}

        <h2 className="text-3xl font-semibold text-[var(--color-dark)]">
          {isCompliant ? "Compliant" : "Non-Compliant"}
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {visibleScenarioChecks.map((check) => {
          const scenarioIsCompliant = check.status === "compliant";

          return (
            <div
              key={check.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-xl text-[var(--color-primary)]/85">
                {check.label}
              </span>

              <span
                className={`text-lg font-medium ${
                  scenarioIsCompliant ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {scenarioIsCompliant ? "✓ Compliant" : "✗ Non-compliant"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AnalysisStatusCard;

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
    <section className="flex h-full flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
        Status
      </p>

      <div className="mt-4 flex items-center gap-3">
        {isCompliant ? (
          <Check className="text-emerald-500" size={24} strokeWidth={2.4} />
        ) : (
          <AlertTriangle
            className="text-amber-500"
            size={24}
            strokeWidth={2.4}
          />
        )}

        <h2 className="text-2xl font-semibold leading-none text-[var(--color-dark)]">
          {isCompliant ? "Compliant" : "Non-Compliant"}
        </h2>
      </div>

      {visibleScenarioChecks.length > 0 && (
        <div className="mt-5 space-y-2">
          {visibleScenarioChecks.map((check) => {
            const scenarioIsCompliant = check.status === "compliant";

            return (
              <div
                key={check.label}
                className="grid grid-cols-[1fr_auto] items-center gap-4"
              >
                <span className="text-sm text-[var(--color-primary)]/85">
                  {check.label}
                </span>

                <span
                  className={`whitespace-nowrap text-sm font-medium ${
                    scenarioIsCompliant ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {scenarioIsCompliant ? "✓ Compliant" : "✗ Non-compliant"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AnalysisStatusCard;

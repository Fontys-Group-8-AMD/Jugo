import { AlertTriangle, Check } from "lucide-react";
import type { AnalysisSummaryCardProps } from "../../types/analysisResult";
import AnalysisConfidenceCircle from "./AnalysisConfidenceCircle";

const AnalysisSummaryCard = ({
  score,
  status,
  scenarioChecks,
}: AnalysisSummaryCardProps) => {
  const isCompliant = status === "compliant";
  const statusLabel = isCompliant ? "Compliant" : "Non-Compliant";

  const visibleScenarioChecks = scenarioChecks.filter(
    (check) => check.evaluated,
  );

  return (
    <section className="rounded-md border border-[var(--color-border)] bg-[var(--color-white)] p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[1fr_140px] md:items-stretch">
        <div className="flex h-full min-h-24 flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]/80">
            Status
          </p>

          <div className="flex flex-1 items-center gap-3">
            {isCompliant ? (
              <Check className="text-emerald-500" size={35} strokeWidth={2.4} />
            ) : (
              <AlertTriangle
                className="text-amber-500"
                size={35}
                strokeWidth={2.4}
              />
            )}

            <h2 className="text-3xl font-semibold leading-none text-[var(--color-dark)]">
              {statusLabel}
            </h2>
          </div>

          {visibleScenarioChecks.length > 0 && (
            <div className="mt-4 space-y-2">
              {visibleScenarioChecks.map((check) => {
                const scenarioIsCompliant = check.status === "compliant";
                const scenarioStatusLabel = scenarioIsCompliant
                  ? "✓ Compliant"
                  : "✗ Non-compliant";

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
                        scenarioIsCompliant
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {scenarioStatusLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <AnalysisConfidenceCircle score={score} />
      </div>
    </section>
  );
};

export default AnalysisSummaryCard;

import { Info } from "lucide-react";

const RuleInfoCard = () => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-[var(--color-accent)]">
          <Info size={20} strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
            IBCS Rule UN 3.2
          </h2>

          <p className="mt-5 text-base leading-9 text-[var(--color-primary)]/80">
            The "Unify Scenarios" rule requires consistent visual encoding of
            data scenarios across all charts. Each scenario type must use a
            distinct, standardized visual pattern to avoid ambiguity.
          </p>

          <div className="mt-10">
            <h3 className="text-xl font-semibold text-[var(--color-dark)]">
              IBCS Scenario Notation
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-10 w-16 rounded-md bg-[#071637]" />
                <div>
                  <p className="text-xl font-semibold text-[var(--color-dark)]">
                    Actual
                  </p>
                  <p className="text-base text-[var(--color-primary)]/70">
                    Solid fill
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-16 rounded-md border-2 border-[var(--color-dark)] bg-transparent" />
                <div>
                  <p className="text-xl font-semibold text-[var(--color-dark)]">
                    Plan / Budget
                  </p>
                  <p className="text-base text-[var(--color-primary)]/70">
                    Outlined bars
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="h-10 w-16 rounded-md border border-[var(--color-border)]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #c8ced8 0, #c8ced8 1px, transparent 1px, transparent 6px)",
                  }}
                />
                <div>
                  <p className="text-xl font-semibold text-[var(--color-dark)]">
                    Forecast
                  </p>
                  <p className="text-base text-[var(--color-primary)]/70">
                    Hatched fill
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RuleInfoCard;

import { ShieldCheck } from "lucide-react";

const RuleInfoCard = () => {
  return (
    <section className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-background)] text-[var(--color-primary)]">
          <ShieldCheck size={24} strokeWidth={2} />
        </div>

        <div>
          <span className="inline-flex rounded-full bg-[var(--color-background)] px-3 py-1 text-sm font-medium text-[var(--color-primary)]">
            Selected Rule
          </span>

          <h2 className="mt-4 text-2xl font-semibold text-[var(--color-dark)]">
            IBCS UN 3.2 — Unify Scenarios
          </h2>

          <p className="mt-3 text-base leading-7 text-[var(--color-primary)]/80">
            This rule checks whether scenario notation is used consistently and
            clearly across the dashboard, helping users compare values without
            confusion.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RuleInfoCard;

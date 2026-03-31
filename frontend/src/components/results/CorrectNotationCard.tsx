const CorrectNotationCard = () => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
        Correct IBCS Notation
      </h2>

      <p className="mt-4 text-base leading-7 text-[var(--color-primary)]/80">
        According to IBCS UN 3.2, scenario data should use standardized visual
        notation so users can distinguish Actual, Plan, and Forecast values at a
        glance.
      </p>

      <div className="mt-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="h-10 w-16 rounded-md bg-[#071637]" />

          <div>
            <p className="text-lg font-semibold text-[var(--color-dark)]">
              Actual
            </p>
            <p className="text-sm text-[var(--color-primary)]/70">
              Use solid dark bars for actual values.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="h-10 w-16 rounded-md border-2 border-[var(--color-dark)] bg-transparent" />

          <div>
            <p className="text-lg font-semibold text-[var(--color-dark)]">
              Plan / Budget
            </p>
            <p className="text-sm text-[var(--color-primary)]/70">
              Use outlined or hollow bars for planned values.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div
            className="h-10 w-16 rounded-md border border-[var(--color-border)] bg-[var(--color-white)]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #c8ced8 0, #c8ced8 1px, transparent 1px, transparent 6px)",
            }}
          />

          <div>
            <p className="text-lg font-semibold text-[var(--color-dark)]">
              Forecast
            </p>
            <p className="text-sm text-[var(--color-primary)]/70">
              Use hatched fill for forecast values.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorrectNotationCard;

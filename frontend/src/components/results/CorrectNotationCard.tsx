import ScenarioLegend from "../analyze/ScenarioLegend";

const CorrectNotationCard = () => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-white)] p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[var(--color-dark)]">
        Correct IBCS Notation
      </h2>

      <p className="mt-4 text-base leading-7 text-[var(--color-primary)]/80">
        According to IBCS UN 3.2, scenario data should use standardized visual
        notation so users can distinguish Previous, Actual, Plan / Budget, and
        Forecast values at a glance.
      </p>

      <div className="mt-8">
        <ScenarioLegend showTitle={false} />
      </div>
    </section>
  );
};

export default CorrectNotationCard;

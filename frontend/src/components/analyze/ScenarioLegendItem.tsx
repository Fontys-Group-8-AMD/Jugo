import type { ScenarioLegendItemData } from "../../data/scenarioNotation";

interface ScenarioLegendItemProps {
  item: ScenarioLegendItemData;
}

const ScenarioLegendItem = ({ item }: ScenarioLegendItemProps) => {
  const swatchClassName =
    item.variant === "solid"
      ? "bg-[#071637]"
      : item.variant === "outline"
        ? "border-2 border-[var(--color-dark)] bg-transparent"
        : "border border-[var(--color-border)] bg-[var(--color-white)]";

  return (
    <div className="flex items-start gap-4">
      <div
        className={`h-10 w-16 rounded-md ${swatchClassName}`}
        style={
          item.variant === "hatched"
            ? {
                backgroundImage:
                  "repeating-linear-gradient(45deg, #c8ced8 0, #c8ced8 1px, transparent 1px, transparent 6px)",
              }
            : undefined
        }
      />

      <div>
        <p className="text-xl font-semibold text-[var(--color-dark)]">
          {item.label}
        </p>
        <p className="text-base text-[var(--color-primary)]/70">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default ScenarioLegendItem;

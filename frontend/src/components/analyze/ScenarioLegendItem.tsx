import type { ScenarioLegendItemData } from "../../data/scenarioNotation";

interface ScenarioLegendItemProps {
  item: ScenarioLegendItemData;
}

const ScenarioLegendItem = ({ item }: ScenarioLegendItemProps) => {
  const swatchClassName =
    item.variant === "actual"
      ? "bg-[#4A4A4A]"
      : item.variant === "previous"
        ? "bg-[#A3A3A3]"
        : item.variant === "outline"
          ? "border-2 border-[var(--color-dark)] bg-transparent"
          : "border-2 border-[var(--color-dark)] bg-[var(--color-white)]";

  return (
    <div className="flex items-start gap-4">
      <div
        className={`h-10 w-16 rounded-md ${swatchClassName}`}
        style={
          item.variant === "hatched"
            ? {
                backgroundImage:
                  "repeating-linear-gradient(135deg, #4A4A4A 0, #4A4A4A 3px, transparent 3px, transparent 8px)",
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

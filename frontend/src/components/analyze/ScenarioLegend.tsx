import { scenarioNotation } from "../../data/scenarioNotation";
import ScenarioLegendItem from "./ScenarioLegendItem";

interface ScenarioLegendProps {
  showTitle?: boolean;
}

const ScenarioLegend = ({ showTitle = true }: ScenarioLegendProps) => {
  return (
    <div className="mt-9">
      {showTitle && (
        <h3 className="text-lg font-semibold text-[var(--color-dark)]">
          Scenario Notation
        </h3>
      )}

      <div className={showTitle ? "mt-5 space-y-5" : "space-y-5"}>
        {scenarioNotation.map((item) => (
          <ScenarioLegendItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ScenarioLegend;

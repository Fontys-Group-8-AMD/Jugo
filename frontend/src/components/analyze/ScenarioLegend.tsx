import { scenarioNotation } from "../../data/scenarioNotation";
import ScenarioLegendItem from "./ScenarioLegendItem";

const ScenarioLegend = () => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-[var(--color-dark)]">
        IBCS Scenario Notation
      </h3>

      <div className="mt-6 space-y-5">
        {scenarioNotation.map((item) => (
          <ScenarioLegendItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ScenarioLegend;

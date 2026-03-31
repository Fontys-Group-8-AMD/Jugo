export type ScenarioLegendVariant = "solid" | "outline" | "hatched";

export interface ScenarioLegendItemData {
  label: string;
  description: string;
  variant: ScenarioLegendVariant;
}

export const scenarioNotation: ScenarioLegendItemData[] = [
  {
    label: "Actual",
    description: "Solid fill",
    variant: "solid",
  },
  {
    label: "Plan / Budget",
    description: "Outlined bars",
    variant: "outline",
  },
  {
    label: "Forecast",
    description: "Hatched fill",
    variant: "hatched",
  },
];

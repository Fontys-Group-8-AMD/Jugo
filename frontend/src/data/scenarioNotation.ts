export type ScenarioLegendVariant =
  | "actual"
  | "outline"
  | "hatched"
  | "previous";

export interface ScenarioLegendItemData {
  label: string;
  description: string;
  variant: ScenarioLegendVariant;
}

export const scenarioNotation: ScenarioLegendItemData[] = [
  {
    label: "Previous",
    description: "Light solid fill",
    variant: "previous",
  },
  {
    label: "Actual",
    description: "Solid fill",
    variant: "actual",
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

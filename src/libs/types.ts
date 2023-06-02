import { ChartTypeRegistry } from "chart.js";

export interface IChartMakerProps<T extends keyof ChartTypeRegistry> {
  type: T;
  chartType: string;
  data: any;
  isMulti?: boolean;
}

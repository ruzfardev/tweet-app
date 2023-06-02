export interface IMetricContainerProps {
  isLoading: boolean;
  data: {
    title: string;
    value: number | undefined;
  }[];
}

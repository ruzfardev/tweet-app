import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../service";
import Chart from "./Chart";
import { useParams } from "react-router-dom";
import { IHorizontalBarGraph } from "../../model/IHorizontalBarGraph";
import { ChartMaker } from "../../libs";
interface IProps {
  username: string;
}
export const StackedBarChart: FC<any> = () => {
  const { userName } = useParams();
  const apiService = new ApiService();
  const [graphData, setGraphData] = useState<IHorizontalBarGraph>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["horizontalBarGraph", userName],
    queryFn: () => apiService.getStackedBarData(userName),
    onSuccess: (data) => {
      setGraphData(data);
    },
  });

  const stackedBarChartMaker = new ChartMaker<"bar">({
    type: "bar",
    chartType: "stackedBar",
    data: graphData,
    isMulti: false,
  });

  return (
    <Chart loading={isLoading}>
      {graphData && stackedBarChartMaker.makeChart()}
    </Chart>
  );
};

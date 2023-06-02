import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../service";
import Chart from "./Chart";
import { useParams } from "react-router-dom";
import { IBarGraph } from "../../model/IBarGraph";
import { ChartMaker } from "../../libs";
interface IProps {
  username: string;
}
export const MultiGraph: FC<any> = () => {
  const { userName } = useParams();
  const apiService = new ApiService();
  const [graphData, setGraphData] = useState<IBarGraph>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["multiGraphData2", userName],
    queryFn: () => apiService.getMultiGraphData(userName, "multiGraphData2"),
    onSuccess: (data) => {
      setGraphData(data);
    },
  });
  const multiChartMaker: ChartMaker<"bar"> = new ChartMaker<"bar">({
    type: "bar",
    chartType: "multiChart2",
    data: graphData,
    isMulti: true,
  });

  return (
    <Chart loading={isLoading}>
      {graphData && multiChartMaker.makeChart()}
    </Chart>
  );
};

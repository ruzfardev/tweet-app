import React, { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../service";
import { ILineGraph } from "../../model/ILineGraph";
import Chart from "./Chart";
import { useParams } from "react-router-dom";
import { ChartMaker } from "../../libs";
interface IProps {
  username: string;
}
export const ClusteredBarChart: FC<any> = () => {
  const { userName } = useParams();
  const apiService = new ApiService();
  const [graphData, setGraphData] = useState<ILineGraph>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lineGraph", userName],
    queryFn: () => apiService.getClusteredBarChartData(userName),
    onSuccess: (data) => {
      setGraphData(data);
    },
  });
  const barChartMaker = new ChartMaker<"bar">({
    type: "bar",
    chartType: "clusteredBar",
    data: data,
    isMulti: false,
  });

  return <Chart loading={isLoading}>{data && barChartMaker.makeChart()}</Chart>;
};

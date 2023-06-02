import React, { useState } from "react";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../service";
import { useParams } from "react-router-dom";
import { ChartMaker } from "../../libs";

export const PieChart = () => {
  const [graphData, setGraphData] = useState<any>();
  const { userName } = useParams();
  const apiService = new ApiService();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pieChart", userName],
    queryFn: () => {
      return apiService.getPieChartData(userName);
    },
    onSuccess: (data) => {
      setGraphData(data);
    },
  });

  const pieChartMaker = new ChartMaker<"pie">({
    type: "pie",
    chartType: "pie",
    data: graphData,
    isMulti: false,
  });
  return (
    <Chart loading={isLoading}>{graphData && pieChartMaker.makeChart()}</Chart>
  );
};

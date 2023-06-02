import React, { FC, useEffect, useRef, useState } from "react";
import malaysia from "../../assets/malaysia.json";
import * as echarts from "echarts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service";
import { convertToMapData } from "../../helpers";

const EMap: FC<any> = ({ resize }) => {
  const { userName } = useParams();
  const apiService = new ApiService();
  const chartRef = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<any>();
  const { isLoading, isSuccess } = useQuery({
    queryKey: ["map", userName],
    queryFn: () => apiService.getMapData(userName),
    onSuccess: (data) => {
      setOptions(convertToMapData(data));
    },
  });
  useEffect(() => {
    // @ts-ignore
    echarts.registerMap("malaysia", malaysia);
    const chart = echarts.init(chartRef.current as HTMLDivElement);
    console.log("mapdata", options);
    options && chart.setOption(options);

    if (resize && chart) {
      chart.resize();
      chart.showLoading();
    }
    const handleWindowResize = () => {
      if (chart) {
        chart.resize();
      }
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      chart?.dispose();
    };
  }, [options, chartRef]);
  return (
    <div id="map" ref={chartRef} style={{ width: "100%", height: "350px" }} />
  );
};

export default EMap;

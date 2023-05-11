import React, {FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiService} from "../../service";
import {ILineGraph} from "../../model/ILineGraph";
import {convertToLineGraphData} from "../../helpers";
import echarts from "echarts";
import Chart from "./Chart";
import {useParams} from "react-router-dom";
interface IProps {
    username: string;
}
export const LineGraph:FC<any> = () => {
    const { userName } = useParams();
    const apiService = new ApiService();
    const [graphData, setGraphData] = useState<ILineGraph>();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['lineGraph', userName],
        queryFn: () => apiService.getLineGraphData(userName),
        onSuccess: (data) => {
            setGraphData(convertToLineGraphData(data))
        },
    });

    return (
        <>
            {isLoading ? <div>Loading...</div> : graphData && <Chart options={graphData}/>}
        </>
    )
}

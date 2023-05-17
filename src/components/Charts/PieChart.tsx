import React, {useState} from 'react';
import Chart from "./Chart";
import {useQuery} from "@tanstack/react-query";
import {ApiService} from "../../service";
import {useParams} from "react-router-dom";
import {convertToPieChartData} from "../../helpers";

export const PieChart = () => {
    const [graphData, setGraphData] = useState<any>();
    const {userName} = useParams();
    const apiService = new ApiService();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['pieChart', userName],
        queryFn: () => {
            return apiService.getPieChartData(userName);
        },
        onSuccess: (data) => {
            setGraphData(convertToPieChartData(data));
        }
    });
    return (
        <>
            {isLoading ? <div>Loading...</div> : graphData && <Chart id="barGraph" options={graphData}/>}
        </>
    )
}

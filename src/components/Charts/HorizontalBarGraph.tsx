import React, {FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiService} from "../../service";
import {convertToHorizontalBarGraphData} from "../../helpers";
import Chart from "./Chart";
import {useParams} from "react-router-dom";
import {IHorizontalBarGraph} from "../../model/IHorizontalBarGraph";
interface IProps {
    username: string;
}
export const HorizontalBarGraph:FC<any> = () => {
    const { userName } = useParams();
    const apiService = new ApiService();
    const [graphData, setGraphData] = useState<IHorizontalBarGraph>();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['horizontalBarGraph', userName],
        queryFn: () => apiService.getHorizontalBarData(userName),
        onSuccess: (data) => {
            setGraphData(convertToHorizontalBarGraphData(data))
        },
    });

    return (
        <>
            {isLoading ? <div>Loading...</div> : graphData && <Chart id={"horizontalBarGraph"} key={4} options={graphData}/>}
        </>
    )
}

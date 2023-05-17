import React, {FC, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ApiService} from "../../service";
import { convertToBarGraphData} from "../../helpers";
import Chart from "./Chart";
import {useParams} from "react-router-dom";
import {IBarGraph} from "../../model/IBarGraph";
interface IProps {
    username: string;
}
export const BarGraph:FC<any> = () => {
    const { userName } = useParams();
    const apiService = new ApiService();
    const [graphData, setGraphData] = useState<IBarGraph>();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['barGraph', userName],
        queryFn: () => apiService.getBarGraphData(userName),
        onSuccess: (data) => {
            setGraphData(convertToBarGraphData(data))
        },
    });

    return (
        <>
            {isLoading ? <div>Loading...</div> : graphData && <Chart id={"barGraph"} options={graphData}/>}
        </>
    )
}

import React, {FC, useState, useEffect} from "react"
import {Card, Segmented} from "antd";
import {SegmentedValue} from "antd/lib/segmented";
import { BarChartOutlined,LineChartOutlined} from "@ant-design/icons";
import {EChart} from "./EChart";
import {ILineGraph} from "../../model/ILineGraph";
import {IHorizontalBarGraph} from "../../model/IHorizontalBarGraph";
import {IBarGraph} from "../../model/IBarGraph";
interface IProps {
    options: ILineGraph | IHorizontalBarGraph | IBarGraph;
    id: string;
    type?: string;
    loading?: boolean
}

const Chart:FC<IProps> = ({options, id,  loading, type}) => {
    const [graphData, setGraphData] = useState(options);
    const [chartType, setChartType] = useState<string>('line');
    useEffect(
        () => {
            setGraphData(options)
        }, [graphData, chartType]
    )
    return (
        <Card bordered={true} loading={loading}>
            <EChart loading={loading} id={id} data={graphData}/>
        </Card>
    )
}
export default Chart

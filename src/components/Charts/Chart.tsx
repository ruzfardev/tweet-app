import React, {FC, useState, useEffect} from "react"
import {Card, Segmented} from "antd";
import {SegmentedValue} from "antd/lib/segmented";
import { SettingOutlined, BarChartOutlined,LineChartOutlined} from "@ant-design/icons";
import {EChart} from "./EChart";
import {ILineGraph} from "../../model/ILineGraph";
interface IProps {
    options: ILineGraph;
}

const Chart:FC<IProps> = ({options}) => {
    const [graphData, setGraphData] = useState(options);
    const [chartType, setChartType] = useState<string>('line');
    const handleChange = (value: SegmentedValue) => {
        console.log(value);
        if(typeof value === "string") {
            console.log("qwerty");
            setChartType(value);
            // change type property inside of series array in graphData
            const newGraphData = {...graphData};
            newGraphData.series[0].type = value;
            setGraphData(newGraphData);
        }

    }
    useEffect(
        () => {

        }, [graphData, chartType]
    )
    return (
        <Card title="Chart" bordered={true}
            extra={
                <Segmented
                    onChange={handleChange}
                    options={[
                        {
                            value: 'line',
                            icon: <LineChartOutlined />,
                        },
                        {
                            value: 'bar',
                            icon: <BarChartOutlined />,
                        },
                    ]}
                />
            }  >
            <EChart data={graphData}/>
        </Card>
    )
}
export default Chart

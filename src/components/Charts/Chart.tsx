import React, {FC} from "react"
import {Card} from "antd";
import { FullscreenOutlined} from "@ant-design/icons";
import EChart from "./EChart";

interface Props {
    option: any;
    resize: boolean;
}
const Chart:FC<Props> = ({option, resize}) => {
    return (
        <Card title="Chart" bordered={false}
            extra={<FullscreenOutlined />}  >
            <EChart option={option} resize={resize}/>
        </Card>
    )
}
export default Chart

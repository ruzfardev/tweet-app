import React, {FC} from "react"
import {Button, Card} from "antd";
import { SettingOutlined} from "@ant-design/icons";
import EChart from "./EChart";

const Chart:FC = () => {
    return (
        <Card title="Chart" bordered={true}
            extra={
            <Button  shape="circle" icon={<SettingOutlined />} />
            }  >
            <EChart/>
        </Card>
    )
}
export default Chart

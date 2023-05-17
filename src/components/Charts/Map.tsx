import React from 'react'
import {Card} from "antd";
import EMap from "./EMap";

export const Map = () => {
    return (
        <Card bordered={true}>
            <EMap/>
        </Card>
    )
}
export default Map;

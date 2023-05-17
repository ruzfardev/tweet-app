import {BaseModel} from "./base.model";

export interface IHorizontalBarGraph extends BaseModel {
    xAxis: {
        type: string,
    },
    yAxis: {
        type: string,
        data: string[]
    }
}

import {BaseModel} from "./base.model";

export interface IBarGraph extends BaseModel {
    xAxis: {
        type: string,
    },
    yAxis: {
        type: string,
        data: string[]
    }
}

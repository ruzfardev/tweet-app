import {BaseModel} from "./base.model";

export interface ILineGraph extends BaseModel {
    xAxis: {
        type: string,
        boundaryGap: boolean,
    }
}

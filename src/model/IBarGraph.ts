import {BaseModel} from "./base.model";
import {ILineGraph} from "./ILineGraph";

export interface IBarGraph extends BaseModel, ILineGraph {
    xAxis: {
        type: string,
        data: string[]
        boundaryGap: boolean
    },
    yAxis: [{
        type: string,
    }]
}

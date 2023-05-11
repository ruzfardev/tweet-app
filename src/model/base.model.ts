export interface BaseModel{
    legend: {
        data: string[]
    },
    tooltip: {
        show: boolean
        trigger: string
    },
    xAxis: {
        type: string,
        data?: string[]
    },
    yAxis: {},
    series: [{
        data: number[],
        type: string
    }]
}

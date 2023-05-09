import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';



const EChart: React.FC<any> = ({resize}) => {
    const chart = useRef<HTMLDivElement>(null);
    const [chartEl, setChartEl] = useState<echarts.ECharts | null>(null);
    useEffect(() => {
        if (resize && chartEl) {
            chartEl.resize();
        }

        if (!chartEl) {
            const newChartEl = echarts.init(chart.current as HTMLDivElement);
            newChartEl.setOption({
                title: {
                    text: 'ECharts Getting Started Example'
                },
                tooltip: {},
                xAxis: {
                    data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
                },
                yAxis: {},
                series: [
                    {
                        name: 'sales',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
            setChartEl(newChartEl);
        } else {
            setChartEl(echarts.init(chart.current as HTMLDivElement));
        }
    }, [chartEl]);



    return <div
    style={{
        height: "300px",
        // width: "100%",
    }}

        className="chart" ref={chart}></div>;
};
export default EChart;

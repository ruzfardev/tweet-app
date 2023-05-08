import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface ChartProps {
    option: echarts.EChartsOption;
    resize: boolean;
}

const EChart: React.FC<ChartProps> = ({ option, resize }) => {
    const chart = useRef<HTMLDivElement>(null);
    const [chartEl, setChartEl] = useState<echarts.ECharts | null>(null);

    useEffect(() => {
        if (resize && chartEl) {
            chartEl.resize();
        }

        if (!chartEl) {
            const newChartEl = echarts.init(chart.current as HTMLDivElement);
            newChartEl.setOption(option);
            setChartEl(newChartEl);
        } else {
            setChartEl(echarts.init(chart.current as HTMLDivElement));
        }
    }, [option, chartEl, resize]);

    return <div className="chart" ref={chart}></div>;
};
export default EChart;

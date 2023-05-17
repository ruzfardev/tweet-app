import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import malaysia from "../../assets/malaysia.json";


interface IProps {
    resize?: boolean;
    data: any;
    id: string;
    loading?:boolean
}
export const EChart: React.FC<IProps> = ({ resize, data, id, loading}) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
    console.log(data)
    useEffect(() => {
        const initializeChart = () => {
            // @ts-ignore
            const chart = echarts.init(chartRef.current as HTMLDivElement);
            chart.setOption(data);
            setChartInstance(chart);
        };

        if (resize && chartInstance) {
            chartInstance.resize();
            chartInstance.showLoading();
        }

        if (!chartInstance) {
            initializeChart();
        }

        return () => {
            chartInstance?.dispose();
        };
    }, [resize, chartInstance]);

    return <div id={id} ref={chartRef} style={{ width: '100%', height: '350px' }} />;
};

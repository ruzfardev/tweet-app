import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';


interface IProps {
    resize?: boolean;
    data: any;
}
export const EChart: React.FC<IProps> = ({resize, data}) => {
    const chart = useRef<HTMLDivElement>(null);
    const [chartEl, setChartEl] = useState<echarts.ECharts | null>(null);
    useEffect(() => {

        if (resize && chartEl) {
            chartEl.resize();
            chartEl.showLoading();
        }

        if (!chartEl) {
            const newChartEl = echarts.init(chart.current as HTMLDivElement);
            newChartEl.setOption(data);
            setChartEl(newChartEl);
            newChartEl.hideLoading();
        } else {
            setChartEl(echarts.init(chart.current as HTMLDivElement));
        }
    }, [chartEl]);
    return (
        <div ref={chart} style={{ width: '100%', height: '350px' }} />
    );
};

import React, {FC, useEffect, useRef, useState} from "react";
import malaysia from "../../assets/malaysia.json";
import * as echarts from 'echarts';
import {Card, Segmented} from "antd";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import {ApiService} from "../../service";
import {convertToMapData} from "../../helpers";

const EMap: FC<any> = ({resize}) => {
    const {userName} = useParams();
    const apiService = new ApiService();
    const chartRef = useRef<HTMLDivElement>(null);
    const [options, setOptions] = useState<any>();
    const {isLoading, isSuccess} = useQuery({
        queryKey: ['map', userName],
        queryFn: () =>  apiService.getMapData(userName),
        onSuccess: (data) => {
            setOptions(convertToMapData(data));
        }
    })
    useEffect(() => {
        // @ts-ignore
        echarts.registerMap('malaysia', malaysia);
        const chart = echarts.init(chartRef.current as HTMLDivElement);
        // chart.setOption({
        //     "geo": {
        //         "map": "malaysia",
        //         "roam": true,
        //         "emphasis": {
        //             "label": {
        //                 "show": true
        //             }
        //         },
        //         "itemStyle": {
        //             "areaColor": "#e7e8ea"
        //         }
        //     },
        //     "title": {
        //         "text": "Number of Tweets by Cities"
        //     },
        //     "tooltip": {
        //         "trigger": "item",
        //         "showDelay": 0,
        //         "transitionDuration": 0.2
        //     },
        //     "visualMap": {
        //         "left": "right",
        //         "min": 1,
        //         "max": 30,
        //         "inRange": {
        //             "color": [
        //                 "#313695",
        //                 "#4575b4",
        //                 "#74add1",
        //                 "#fdae61",
        //                 "#f46d43",
        //                 "#d73027",
        //                 "#a50026"
        //             ]
        //         },
        //         "text": [
        //             "High",
        //             "Low"
        //         ],
        //         "calculable": true
        //     },
        //     "toolbox": {
        //         "show": true,
        //         "left": "left",
        //         "top": "top",
        //         "feature": {
        //             "dataView": {
        //                 "readOnly": false
        //             },
        //             "restore": {},
        //             "saveAsImage": {}
        //         }
        //     },
        //     "series": [
        //         {
        //             "name": "Malaysia cities",
        //             "type": "map",
        //             "map": "malaysia",
        //             "emphasis": {
        //                 "label": {
        //                     "show": true
        //                 }
        //             },
        //             "data": []
        //         }
        //     ]
        // })
        // setChartInstance(chart);
        console.log('mapdata', options)
        options && chart.setOption(options);

        if (resize && chart) {
            chart.resize();
            chart.showLoading();
        }

        return () => {
            chart?.dispose();
        };
    }, [options, chartRef]);
    return(
            <div id='map' ref={chartRef} style={{ width: '100%', height: '350px' }} />
    )
}


export default EMap;

import {ILineGraph} from "../model/ILineGraph";

import syedsaddiq from '../assets/images/syedsaddiq.jpg'
import muhyiddin from '../assets/images/muhyiddin.jpg'
import anwar from '../assets/images/anwaribrahim.jpg'
import zahid from '../assets/images/zahid.jpg'
export const getSentimentColor = (sentiment: number) => {
    switch (sentiment) {
        case 1:
            return {
                color: 'blue',
                text: 'Neutral'
            }
        case 2:
            return {
                color: 'green',
                text: "Positive"
            }
        case 3:
            return {
                color: 'red',
                text: "Negative"
            }
        default:
            return {
                color: 'info',
                text: 'Neutral'
            }
    }
}

export const convertToLineGraphData = (data: any): ILineGraph => {
    console.log(data);
    const output = data.reduce((acc: any, { tweetDate, sentiment, count }: any) => {
        acc.legend.data = [...new Set(data.map((d: any) => d.sentiment === 1 ? 'Neutral' : d.sentiment === 2 ? 'Positive' : 'Negative'))];
        let seriesObj = acc.series.find((s:any) => s.name === getSentimentColor(sentiment).text);
        if (!seriesObj) {
            seriesObj = {
                name: sentiment === 1 ? 'Neutral' : sentiment === 2 ? 'Positive' : 'Negative',
                type: 'line',
                data: [],
                color: sentiment === 1 ? 'blue' : sentiment === 2 ? 'green' : 'red'
            };
            acc.series.push(seriesObj);
        }
        let yearIndex = acc.xAxis.data.indexOf(tweetDate);
        if (yearIndex === -1) {
            acc.xAxis.data.push(
                new Date(tweetDate).getDate() + '/' + (new Date(tweetDate).getMonth() + 1) + '/' + new Date(tweetDate).getFullYear()
            );
            yearIndex = acc.xAxis.data.length - 1;
        }
        seriesObj.data[yearIndex] = count;
        acc.xAxis.data = [...new Set(acc.xAxis.data)];
        acc.xAxis.axisLabel = {
            interval: 0,
            rotate: 45
        }
        acc.xAxis.type = 'category';
        acc.toolbox = {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false, show: true},
                restore: {show: true},
                saveAsImage: {show: true},
                mark: {show: true},
            }
        }
        return acc;
    }, {
        legend: { data: [] },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: { data: [] },
        yAxis: [{type: 'value' }],
        series: [],
    });

    // Output the result
    console.log(output);
    return output;
}

export const getUserAvatar = (userName: string) => {
    switch (userName) {
        case 'Anwar_Ibrahim':
            return anwar;
        case 'Muhyiddin_Yassin':
            return muhyiddin;
        case 'Syed_Saddiq':
            return syedsaddiq;
        case 'Ahmad_Zahid_Hamidi':
            return zahid;
        default:
            return anwar;
    }
}

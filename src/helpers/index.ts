import {ILineGraph} from "../model/ILineGraph";

import syedsaddiq from '../assets/images/syedsaddiq.jpg'
import muhyiddin from '../assets/images/muhyiddin.jpg'
import anwar from '../assets/images/anwaribrahim.jpg'
import zahid from '../assets/images/zahid.jpg'
import syedsaddiqWord from '../assets/images/syedsaddiq.png'
import muhyddinWord from '../assets/images/muhyiddin.png'
import anwarWord from '../assets/images/anwaribrahim.png'
import zahidWord from '../assets/images/zahidhamidi.png'
import {IHorizontalBarGraph} from "../model/IHorizontalBarGraph";
import {IBarGraph} from "../model/IBarGraph";
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
    console.log("linegraph", data);
    const output = data.reduce((acc: any, { tweetDate, sentiment, count }: any) => {
        acc.legend.data = [...new Set(data.map((d: any) => d.sentiment === 1 ? 'Neutral' : d.sentiment === 2 ? 'Positive' : 'Negative'))];
        let seriesObj = acc.series.find((s:any) => s.name === getSentimentColor(sentiment).text);
        if (!seriesObj) {
            seriesObj = {
                name: sentiment === 1 ? 'Neutral' : sentiment === 2 ? 'Positive' : 'Negative',
                type: 'line',
                data: [],
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
        title: {
            text: "Number of Tweets Over Days By Topic",
        },
        legend: { data: [],
            bottom: 0,
        },
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
export const convertToBarGraphData = (data: any): IBarGraph => {
    const labelOption = {
        show: true,
        verticalAlign:  "middle",
        rotate: 90,
        formatter: '{c}',
        fontSize: 16,
        rich: {
            name: {}
        }
    };
    const seriesData = data.map((item: any) => item.tweetCount);
    return data.reduce((acc: any, { city, tweetCount }: any) => {
        acc.xAxis.data = [...new Set(data.map((d: any) => d.city))];
        acc.series = [
            {
                type: 'bar',
                id: "barGraph",
                data: seriesData,
                showBackground: true,
                label: labelOption,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
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
        title: {
            id: "barGraph",
            text: "Top 5 Cities With Most Tweets",
        },
        legend: { data: [], bottom: 0 },
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
}
export const convertToHorizontalBarGraphData = (data: any): IHorizontalBarGraph => {
    const output = data.reduce((acc: any, { topic, sentiment, sentimentCount }: any) => {
        acc.yAxis.data = [...new Set(data.map((d: any) => d.topic))];
        acc.legend.data = [...new Set(data.map((d: any) => d.sentiment === 1 ? 'Neutral' : d.sentiment === 2 ? 'Positive' : 'Negative'))];
        let seriesObj = acc.series.find((s:any) => s.name === getSentimentColor(sentiment).text);
        if (!seriesObj) {
            seriesObj = {
                name: sentiment === 1 ? 'Neutral' : sentiment === 2 ? 'Positive' : 'Negative',
                type: 'bar',
                // generate random id for each series
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                data: [],
                label: {
                    show: true
                },
                stack: 'total',
            };
            acc.series.push(seriesObj);
        }

        acc.series = acc.series.map((s:any) => {
            if (s.name === getSentimentColor(sentiment).text) {
                s.data.push(sentimentCount);
            }
            return s;
        });
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
        title: {
            id: "horizontalBarGraph",
            text: "Sentiment Score By Topic",
        },
        legend: { data: [], bottom: 0 },
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: { type: 'value' },
        yAxis: {type: 'category' },
        series: [],
    });

    // Output the result
    console.log(output);
    return output;
}
export const convertToPieChartData = (data: any): any => {
    const seriesData = data.map((item: any) => {
        return {
            name: item.reliability,
            value: item.tweetCount
        }
    })
    return {
        legend: {
            bottom: 0,
            left:"center"
        },
        title: {
            text: 'Tweets Reliability by Levels',
        },
        tooltip: {
            trigger: 'item',
        },
        toolbox: {
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
        },
        series: [
            {
                name: 'Reliability',
                type: 'pie',
                radius: ['20%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'inner',
                    formatter: '{b}: {c}%',
                    fontSize: 10
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                },
                data: seriesData
            }
        ]

    }
}
export const convertToMapData = (data: any): any => {
    const seriesData = data.map((item: any) => { return {
        name: item.city,
        value: item.count
    }});
    return {
        geo: {
            map: 'malaysia',
            roam: true,
            emphasis: {
                label: {
                    show: true,
                },
            },
            itemStyle: {
                areaColor: '#e7e8ea'
            }
        },
        title: {
            text: 'Number of Tweets by Cities',
        },
        tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
        },
        visualMap: {
            left: 'right',
            min: 1,
            max: 25,
            text: ['High', 'Low'],
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'Malaysia cities',
                type: 'map',
                map: 'malaysia',
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: seriesData
            }
        ]
    }
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
export const getUserWordCloud = (userName: string| undefined) => {
    switch (userName) {
        case 'Anwar_Ibrahim':
            return anwarWord;
        case 'Muhyiddin_Yassin':
            return muhyddinWord;
        case 'Syed_Saddiq':
            return syedsaddiqWord;
        case 'Ahmad_Zahid_Hamidi':
            return zahidWord;
        default:
            return anwar;
    }
}


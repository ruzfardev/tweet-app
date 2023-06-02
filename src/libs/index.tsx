import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  Tooltip,
  Legend,
  ChartTypeRegistry,
  Title,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
import { IChartMakerProps } from "./types";

export class ChartMaker<T extends keyof ChartTypeRegistry>
  implements IChartMakerProps<T>
{
  type: T;
  chartType: string;
  data: any = {};
  isMulti: boolean | undefined;
  constructor(props: IChartMakerProps<T>) {
    this.type = props.type;
    this.chartType = props.chartType;
    this.data = props.data;
    this.isMulti = props.isMulti;
    ChartJS.register(
      LinearScale,
      CategoryScale,
      BarElement,
      PointElement,
      LineElement,
      BarController,
      ArcElement,
      Filler,
      Tooltip,
      Legend,
      Title
    );
  }

  convertToMultiChartData = () => {
    const { data } = this;
    const labels = data.map((item: any) =>
      new Date(item.date).toLocaleDateString()
    );
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
      stacked: false,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: "Replies Count vs Average Sentiment Score by Date",
        },
      },
      scales: {
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
        },
        y1: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };
    return {
      labels,
      options,
      datasets: [
        {
          type: "line" as const,
          label: "Average Sentiment Score",
          borderColor: "rgb(250,95,11)",
          backgroundColor: "rgb(250,95,11)",
          data: data.map((item: any) => item.avgSentimentScore),
          yAxisID: "y1",
        },
        {
          type: "bar" as const,
          label: "Replies Count",
          backgroundColor: "rgb(3,82,161)",
          borderWidth: 2,
          fill: true,
          data: data.map((item: any) => item.reTweetCount),
          yAxisID: "y",
        },
      ],
    };
  };
  convertToMultiChartData2 = () => {
    const { data } = this;
    const labels = data.map((item: any) =>
      new Date(item.date).toLocaleDateString()
    );
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index" as const,
      },
      stacked: false,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: "Replies Count vs Average Sentiment Score by Date",
        },
      },
      scales: {
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
        },
        y1: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };
    return {
      labels,
      options,
      datasets: [
        {
          type: "line" as const,
          label: "Average Engagement Rate",
          borderColor: "rgb(250,95,11)",
          backgroundColor: "rgb(250,95,11)",
          borderWidth: 2,
          fill: false,
          data: data.map((item: any) => item.avgEngagementRate),
          yAxisID: "y",
        },
        {
          type: "bar" as const,
          label: "Tweet Count",
          backgroundColor: "rgb(3,82,161)",
          data: data.map((item: any) => item.tweetCount),
          yAxisID: "y1",
        },
      ],
    };
  };
  convertToPieChartData = () => {
    const labels = this.data.map((item: any) => item.sentiment);
    const data = this.data.map((item: any) => item.totalCount);
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: "Overall Sentiment of Tweets",
        },
      },
    };
    return {
      labels,
      options,
      datasets: [
        {
          label: "Sentiment",
          data,
          backgroundColor: [
            "rgb(250,95,11)",
            "rgb(3,82,161)",
            "rgb(0,168,133)",
          ],
          hoverOffset: 4,
        },
      ],
    };
  };
  convertToStackedBarChartData = () => {
    const labels = this.data.map((item: any) => item.hashtags);
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: "Frequency of each Hashtag with the Sentiment Quantity",
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };
    return {
      labels,
      options,
      datasets: [
        {
          label: "Positive",
          data: this.data.map((item: any) => item.positiveSentiment),
          backgroundColor: "rgb(0,168,133)",
        },
        {
          label: "Negative",
          data: this.data.map((item: any) => item.negativeSentiment),
          backgroundColor: "rgb(250,95,11)",
        },
        {
          label: "Neutral",
          data: this.data.map((item: any) => item.neutralSentiment),
          backgroundColor: "rgb(3,82,161)",
        },
      ],
    };
  };
  convertToClusteredBarChartData = () => {
    const labels = this.data.map((item: any) => item.hashtags);
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
        },
        title: {
          display: true,
          text: "Hashtag Frequency by Engagement Quantity",
        },
      },
    };
    return {
      labels,
      options,
      datasets: [
        {
          label: "Likes Count",
          data: this.data.map((item: any) => item.totalLikes),
          backgroundColor: "rgb(0,168,133)",
        },
        {
          label: "Retweets Count",
          data: this.data.map((item: any) => item.totalRetweets),
          backgroundColor: "rgb(250,95,11)",
        },
      ],
    };
  };
  makeChart = () => {
    switch (this.chartType) {
      case "pie":
        const pieData = this.convertToPieChartData();
        return (
          <Chart
            height={300}
            type={"pie"}
            data={pieData}
            options={pieData.options}
          />
        );
      case "multiChart":
        const barData = this.convertToMultiChartData();
        return (
          <Chart
            height={300}
            type={"bar"}
            data={barData}
            options={barData.options}
          />
        );
      case "multiChart2":
        const barData2 = this.convertToMultiChartData2();
        return (
          <Chart
            height={400}
            type={"bar"}
            data={barData2}
            options={barData2.options}
          />
        );
      case "stackedBar":
        const stackedBarData = this.convertToStackedBarChartData();
        return (
          <Bar
            height={300}
            data={stackedBarData}
            options={stackedBarData.options}
          />
        );
      case "clusteredBar":
        const clusteredBarData = this.convertToClusteredBarChartData();
        return (
          <Bar
            height={300}
            data={clusteredBarData}
            options={clusteredBarData.options}
          />
        );
    }
    // return <Chart type={"bar"} data={data} options={data.options} />;
  };
}

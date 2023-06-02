import { ILineGraph } from "../model/ILineGraph";

import syedsaddiq from "../assets/images/syedsaddiq.jpg";
import muhyiddin from "../assets/images/muhyiddin.jpg";
import anwar from "../assets/images/anwaribrahim.jpg";
import zahid from "../assets/images/zahid.jpg";
import syedsaddiqWord from "../assets/images/syedsaddiq.png";
import muhyddinWord from "../assets/images/muhyiddin.png";
import anwarWord from "../assets/images/anwaribrahim.png";
import zahidWord from "../assets/images/zahidhamidi.png";
import { IHorizontalBarGraph } from "../model/IHorizontalBarGraph";
import { IBarGraph } from "../model/IBarGraph";
export const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "Neutral":
      return "blue";
    case "Positive":
      return "green";
    case "Negative":
      return "red";
    default:
      return "info";
  }
};
export const convertToMapData = (data: any): any => {
  const seriesData = data.map((item: any) => {
    return {
      name: item.city,
      value: item.count,
    };
  });
  return {
    geo: {
      map: "malaysia",
      roam: true,
      emphasis: {
        label: {
          show: true,
        },
      },
      itemStyle: {
        areaColor: "#e7e8ea",
      },
    },
    title: {
      text: "Number of Tweets by Cities",
    },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
    },
    visualMap: {
      left: "right",
      min: 1,
      max: 25,
      text: ["High", "Low"],
      calculable: true,
    },
    toolbox: {
      show: true,
      orient: "vertical",
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "Malaysia cities",
        type: "map",
        map: "malaysia",
        emphasis: {
          label: {
            show: true,
          },
        },
        data: seriesData,
      },
    ],
  };
};
export const getUserAvatar = (userName: string) => {
  switch (userName) {
    case "anwaribrahim":
      return anwar;
    case "MuhyiddinYassin":
      return muhyiddin;
    case "SyedSaddiq":
      return syedsaddiq;
    case "DrZahidHamidi":
      return zahid;
    default:
      return anwar;
  }
};
export const getUserWordCloud = (userName: string | undefined) => {
  switch (userName) {
    case "anwaribrahim":
      return anwarWord;
    case "MuhyiddinYassin":
      return muhyddinWord;
    case "SyedSaddiq":
      return syedsaddiqWord;
    case "DrZahidHamidi":
      return zahidWord;
    default:
      return anwar;
  }
};

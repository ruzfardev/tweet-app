import { axiosInstance } from "./api";
import { message } from "antd";
import { IPolitician } from "../model/politician.model";
import { ITweet } from "../model/tweet.model";
export class ApiService {
  async getUsers(): Promise<IPolitician[]> {
    try {
      return await axiosInstance.post("/Users", {});
    } catch (e: any) {
      message.error(e.message);
    }
    return [];
  }
  async getTweets(): Promise<ITweet[]> {
    try {
      return await axiosInstance.post("/GetTweets", {});
    } catch (e: any) {
      message.error(e.message);
    }
    return [];
  }
  async getKeyMetrics(username: string | undefined): Promise<any> {
    try {
      return await axiosInstance.post("/KeyMetrics", {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
  async getClusteredBarChartData(username: string | undefined): Promise<any> {
    try {
      return await axiosInstance.post("/clusteredBarChart", {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
  async getStackedBarData(username: string | undefined): Promise<any> {
    try {
      return await axiosInstance.post("/stackedBarChart", {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
  async getMultiGraphData(
    username: string | undefined,
    path: string
  ): Promise<any> {
    try {
      return await axiosInstance.post(`/${path}`, {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
  async getPieChartData(username: string | undefined): Promise<any> {
    try {
      return await axiosInstance.post("/pieChartData", {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
  async getMapData(username: string | undefined): Promise<any> {
    try {
      return await axiosInstance.post("/numberOfTweetsByCities", {
        filterGroup: {
          filters: [
            {
              jsonProp: "politicianUsername",
              operator: "Equal",
              value: username,
            },
          ],
          groupOperator: "All",
        },
      });
    } catch (e: any) {
      message.error(e.message);
    }
  }
}

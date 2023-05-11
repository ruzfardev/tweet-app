import users from '../mock/users.json';
import tweets from '../mock/tweets.json';
import {axiosInstance} from "./api";
import {message} from "antd";
import {IPolitician} from "../model/politician.model";
import {ITweet} from "../model/tweet.model";

export class Service {
  public static async getUsers() {
    return users;
  }
    public static async getTweets() {
    return tweets;
    }
}

export class ApiService {
    async getUsers(): Promise<IPolitician[]> {
        try {
            return await axiosInstance.post('/Users', {});
        }catch (e: any) {
            message.error(e.message);
        }
        return [];
    }
    async getTweets(): Promise<ITweet[]> {
        try {
            return await axiosInstance.post('/GetTweets', {});
        }catch (e: any) {
            message.error(e.message);
        }
        return [];
    }
    async getLineGraphData(username: string | undefined): Promise<any> {
        try {
            console.log(username);
            return await axiosInstance.post('/numberOfTweetsOverDaysByTopic', {
                "filterGroup": {
                "filters": [
                    {
                        "jsonProp": "politicianUsername",
                        "operator": "Equal",
                        "value": username
                    }
                ],
                    "groupOperator": "All"
            }
            });
        }catch (e: any) {
            message.error(e.message);
        }
    }
    async getBarChartData(username: string | undefined): Promise<any> {

    }
}

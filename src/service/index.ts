import users from '../mock/users.json';
import tweets from '../mock/tweets.json';
export class Service {
  public static async getUsers() {
    return users;
  }
    public static async getTweets() {
    return tweets;
    }
}
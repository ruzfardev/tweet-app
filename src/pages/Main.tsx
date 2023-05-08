import React, { useEffect, useState } from "react";
import { Card, Select, Space, Typography, Checkbox, Button } from "antd";
import { UserCard } from "../components/UserCard";
import TweetCard from "../components/TweetCard";
import { useGlobalState } from "../context/GlobalContext";
import { Service } from "../service";
const Main = () => {
  const { setState, state } = useGlobalState();
  const { users, tweets } = state;
  const [isLoading, setIsLoading] = useState(false);
  const [userSelection, setUserSelection] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<any[]>([]);
  useEffect(() => {
    setIsLoading(true);
    Service.getUsers().then((users) => {
      setState((state: any) => ({ ...state, users }));
    });
    Service.getTweets().then((tweets) => {
      setState((state: any) => ({ ...state, tweets }));
    });
    const options = users?.map((user: any) => ({
      value: user.userName,
      label: user.firstName + " " + user.lastName,
    }));
    options && setUserSelection(options);
    setIsLoading(false);
  }, [setState, users]);
  const handleTimeChange = (value: any) => {
    switch (value) {
      case "15min":
        // filter tweets by timeStamp in 15 minutes tweets
        tweets &&
          setFilteredTweets(
            tweets.filter(
              (tweet: any) =>
                new Date(tweet.timeStamp) >
                new Date(Date.now() - 15 * 60 * 1000)
            )
          );
        break;
      case "1hr":
        // filter tweets by timeStamp in 1 hour tweets
        tweets &&
          setFilteredTweets(
            tweets.filter(
              (tweet: any) =>
                new Date(tweet.timeStamp) >
                new Date(Date.now() - 60 * 60 * 1000)
            )
          );
        break;
      case "24hr":
        // filter tweets by timeStamp in 24 hours tweets
        tweets &&
          setFilteredTweets(
            tweets.filter(
              (tweet: any) =>
                new Date(tweet.timeStamp) >
                new Date(Date.now() - 24 * 60 * 60 * 1000)
            )
          );
        break;
      default:
        break;
    }
  };
  const handleUserSelectionChange = (value: any) => {
    const filteredUsers = users?.filter((user: any) => user.userName === value);
    filteredUsers && setFilteredUsers(filteredUsers);
    const filteredTweets = tweets?.filter(
      (tweet: any) => tweet.owner.userName === value
    );
    filteredTweets && setFilteredTweets(filteredTweets);
  };
  return (
    <section
      style={{
        backgroundColor: " #efefef",
        height: "fit-content",
      }}
    >
      <div className="showcase">
        <Typography.Title
          style={{
            color: "white",
            margin: 0,
            padding: 16,
            textAlign: "center",
            fontSize: 40,
          }}
        >
          Overview
        </Typography.Title>
        <Typography.Paragraph
          style={{
            color: "white",
            margin: "0 auto",
            padding: 16,
            fontSize: 18,
            textAlign: "center",
            width: "30%",
          }}
          ellipsis={{ rows: 3 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, voluptates voluptate quod quos
        </Typography.Paragraph>
        <Card
          style={{
            width: "50%",
            margin: "0 auto",
            marginTop: 20,
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="box">
              <Typography.Title>45</Typography.Title>
              <span>Tweets</span>
            </div>
            <div className="box">
              <Typography.Title>58%</Typography.Title>
              <span>Avg.Approval</span>
            </div>
            <Space direction="vertical">
              <Select
                defaultValue={{
                  value: "15min",
                  label: "Last 15 min",
                }}
                style={{ width: 200 }}
                onChange={handleTimeChange}
                options={[
                  { value: "15min", label: "Last 15 min" },
                  { value: "1hr", label: "Last 1 hour" },
                  { value: "24hr", label: "Last 24 hour" },
                ]}
              />
              <Select
                defaultValue="Select User"
                style={{ width: 200 }}
                onChange={handleUserSelectionChange}
                options={userSelection}
              />
            </Space>
            <Space direction="vertical">
              <Checkbox checked={true}>Exclude Retweets</Checkbox>
              <Button type="primary" danger>
                Pause Stream
              </Button>
            </Space>
          </div>
        </Card>
      </div>
      <div className="main-content">
        <div style={{ flex: "0 0 55%" }}>
          <Typography.Title level={4}>Summary</Typography.Title>
          <div className="users-container">
            {!isLoading &&
              (filteredUsers.length > 0
                ? filteredUsers?.map((user) => {
                    return (
                      <UserCard loading={isLoading} key={user.id} user={user} />
                    );
                  })
                : users?.map((user) => {
                    return (
                      <UserCard loading={isLoading} key={user.id} user={user} />
                    );
                  }))}
          </div>
        </div>
        <div style={{ flex: "0 0 42%" }}>
          <Typography.Title level={4}>Latest Interactions</Typography.Title>
          <div className="tweet-container">
            {!isLoading &&
              (filteredTweets.length > 0
                ? filteredTweets?.map((tweet) => {
                    return (
                      <TweetCard
                        loading={isLoading}
                        key={tweet.id}
                        tweet={tweet}
                      />
                    );
                  })
                : tweets?.map((tweet) => {
                    return (
                      <TweetCard
                        loading={isLoading}
                        key={tweet.id}
                        tweet={tweet}
                      />
                    );
                  }))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;

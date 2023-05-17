import React, { useEffect, useState } from "react";
import {Card, Select, Space, Typography, Checkbox, Button, Skeleton, Spin} from "antd";
import { UserCard } from "../components/UserCard";
import TweetCard from "../components/TweetCard";
import { useGlobalState } from "../context/GlobalContext";
import {ApiService} from "../service";
import {IPolitician} from "../model/politician.model";
import {ITweet} from "../model/tweet.model";
import {useQuery} from "@tanstack/react-query";
import { ClearOutlined } from "@ant-design/icons";
const Main = () => {
  const apiService = new ApiService();
  const { users, tweets, setUsers, setTweets } = useGlobalState();
  const [userSelection, setUserSelection] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IPolitician[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<ITweet[]>([]);
  const [interactions, setInteractions] = useState<number>();
  const [avgApproval, setAvgApproval] = useState<number>();
  const { isLoading: isUsersLoading, error} =  useQuery({
    queryKey: ['users'],
    queryFn: () => apiService.getUsers(),
    onSuccess: (users) => {
      setUsers(users);
      const options = users.map((user: IPolitician) => ({
        label: user.name,
        value: user.id,
      }));
      setUserSelection(options)
      setAvgApproval(Math.floor(users?.map((user: IPolitician) => user.approvalRate).reduce((a: number, b: number) => a + b, 0) / (users?.length || 1)))
    }

  })

  const { isLoading: isTweetsLoading, error: tweetsError} =  useQuery({
      queryKey: ['tweets'],
      queryFn: () => apiService.getTweets(),
        onSuccess: (tweets) => {
          setTweets( tweets );
          setInteractions(tweets[0].totalCount);
        }
  })

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
    console.log(value);
    if(!value) {
        setFilteredUsers(users)
        setFilteredTweets(tweets)
        setAvgApproval(Math.floor(users?.map((user: IPolitician) => user.approvalRate).reduce((a: number, b: number) => a + b, 0) / (users?.length || 1)))
        setInteractions(tweets[0].totalCount);
        return;
    }
    const filteredUsers = users?.filter((user: IPolitician) => user.id === value);
    filteredUsers && setFilteredUsers(filteredUsers);
    setAvgApproval(filteredUsers[0].approvalRate)
    const filteredTweets = tweets?.filter(
      (tweet: any) => tweet.politicianName === value);
    filteredTweets && setFilteredTweets(filteredTweets);
    setInteractions(filteredTweets?.length)
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
          High-level picture of the interactions and sentiment towards the leaders of the top Malaysia political parties
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
              <Typography.Title>
                {
                  (!isTweetsLoading && interactions )
                    ? interactions
                    : <Spin size={"large"} />
                }
              </Typography.Title>
              <span>Interactions</span>
            </div>
            <div className="box">
              <Typography.Title>
                {
                  (!isUsersLoading && avgApproval )
                    ? avgApproval + '%'
                    : <Spin size={"large"} />
                }
              </Typography.Title>
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
                allowClear={true}
                onSelect={(value) => {
                  console.log(value);
                }}
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
        <div style={{ flex: "0 0 50%" }}>
          <Typography.Title level={4}>Summary</Typography.Title>
          <div className="users-container">
            {!isUsersLoading ?
              (filteredUsers.length > 0
                ? filteredUsers?.map((user, index: number) => {
                    return (
                      <UserCard loading={isUsersLoading} key={index} politician={user} />
                    );
                  })
                : users?.map((user, index: number) => {
                    return (
                      <UserCard loading={isUsersLoading} key={index} politician={user} />
                    );
                  }))
              : <Skeleton active avatar/>
            }
          </div>
        </div>
        <div style={{ flex: "0 0 40%" }}>
          <Typography.Title level={4}>Latest Interactions</Typography.Title>
          <div className="tweet-container">
            {!isTweetsLoading ?
              (filteredTweets.length > 0
                ? filteredTweets?.map((tweet, index: number) => {
                    return (
                      <TweetCard
                        loading={isTweetsLoading}
                        key={index}
                        tweet={tweet}
                      />
                    );
                  })
                : tweets?.map((tweet, index: number) => {
                    return (
                      <TweetCard
                        loading={isTweetsLoading}
                        key={index}
                        tweet={tweet}
                      />
                    );
                  }))
            :
            // render 6 skeleton cards
            Array(6).fill(0).map((_, index: number) => {
              return(
                  <Skeleton paragraph={true} active avatar key={index} loading={isTweetsLoading}/>
              )
            })
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;

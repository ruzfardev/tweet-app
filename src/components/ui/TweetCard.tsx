import React, { FC } from "react";
import { Card, Avatar, Typography, Space, Tooltip, Tag } from "antd";
import { UserCard } from "./UserCard";
import users from "../../mock/users.json";
import stc from "string-to-color";
import { ITweet } from "../../model/tweet.model";
import { getSentimentColor, getUserAvatar } from "../../helpers";
const { Text } = Typography;

interface Props {
  tweet: ITweet;
  loading?: boolean;
}

const TweetCard: FC<Props> = ({ tweet, loading }) => {
  const renderContent = (content: string, userName: string) => {
    const parts = content.split(" ");
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <Text
            key={index}
            style={{
              color: "#1890ff",
              cursor: "pointer",
            }}
          >
            {" " + part + " "}
          </Text>
        );
      } else {
        return " " + part + " ";
      }
    });
  };
  return (
    <Card
      loading={loading}
      hoverable={true}
      style={{
        marginBottom: "1rem",
      }}
    >
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text type="secondary">
          {new Date(tweet.createdDate).toLocaleTimeString() +
            "-" +
            new Date(tweet.createdDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </Text>
        <Avatar size={40} src={getUserAvatar(tweet.userId)} />
      </Space>
      <Text style={{ marginTop: "1rem" }}>
        {renderContent(tweet.text, tweet.tweetId)}
      </Text>
      <p
        style={{
          margin: "1rem 0 0 0",
          float: "right",
        }}
      >
        <Tag color={getSentimentColor(tweet.sentiment)}>{tweet.sentiment}</Tag>
      </p>
    </Card>
  );
};

export default TweetCard;

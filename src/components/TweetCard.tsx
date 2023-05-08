import React, { FC } from "react";
import { Card, Avatar, Typography, Space, Tooltip, Tag } from "antd";
import { UserCard } from "./UserCard";
import users from "../mock/users.json";
import stc from "string-to-color";
const { Text } = Typography;

interface Props {
  tweet: {
    id: string;
    owner: {
      id?: number;
      firstName: string;
      lastName: string;
      userName: string;
      jobPosition: string;
      avatar: string;
    };
    content: string;
    timeStamp: string;
    type: string;
  };
  loading?: boolean;
}

const TweetCard: FC<Props> = ({ tweet, loading }) => {
  const renderContent = (content: string, userId: number | undefined) => {
    const parts = content.split(" ");
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        const user = users.find((user) => user.id === userId);
        return (
          <Tooltip
            key={index}
            placement="topLeft"
            title={<UserCard user={user} />}
            color={stc(user && user?.firstName + user?.lastName)}
            arrow={{ pointAtCenter: true }}
          >
            <Text
              style={{
                color: "#1890ff",
                cursor: "pointer",
              }}
            >
              {" " + part + " "}
            </Text>
          </Tooltip>
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
          {new Date(tweet.timeStamp).toLocaleTimeString() +
            "-" +
            new Date(tweet.timeStamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
        </Text>
        <Avatar size={40} src={tweet.owner.avatar} />
      </Space>
      <Text style={{ marginTop: "1rem" }}>
        {renderContent(tweet.content, tweet.owner.id)}
      </Text>
      <p
        style={{
          margin: "1rem 0 0 0",
          float: "right",
        }}
      >
        <Tag
          color={
            tweet.type === "positive"
              ? "green"
              : tweet.type === "negative"
              ? "red"
              : "blue"
          }
        >
          {tweet.type}
        </Tag>
      </p>
    </Card>
  );
};

export default TweetCard;

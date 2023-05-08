import React, { FC } from "react";
import { Card, Avatar, Typography } from "antd";
import stc from "string-to-color";
import { Link } from "react-router-dom";
interface Props {
  user:
    | {
        id: number;
        firstName: string;
        lastName: string;
        jobPosition: string;
        userName: string;
        avatar: string;
      }
    | undefined;
  loading?: boolean;
}
export const UserCard: FC<Props> = ({ user, loading }) => {
  return (
    <Link
      to={`/${user?.userName}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        loading={loading}
        hoverable={true}
        style={{
          textAlign: "center",
          background: `linear-gradient(${stc(
            user && user?.firstName + user?.lastName
          )} 30%, rgb(255, 255, 255) 0%)`,
        }}
      >
        <Avatar
          size={110}
          src={user?.avatar}
          style={{
            border: "5px solid white",
          }}
        />
        <Typography.Title level={3}>
          {user?.firstName} {user?.lastName}
        </Typography.Title>
        <Typography.Text type="secondary">{user?.jobPosition}</Typography.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="">
            <Typography.Title level={4}>45</Typography.Title>
            <span>Tweets</span>
          </div>
          <div className="">
            <Typography.Title level={4}>58%</Typography.Title>
            <span>Avg.Approval</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

import React, { FC } from "react";
import { Card, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
import {IPolitician} from "../model/politician.model";
import {getUserAvatar} from "../helpers";
interface Props {
  politician: IPolitician,
  loading?: boolean;
}
export const UserCard: FC<Props> = ({ politician, loading }) => {
    return (
    <Link
      to={`/${politician?.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        loading={loading}
        hoverable={true}
        style={{
          textAlign: "center",
          background: `linear-gradient(${politician.color} 30%, rgb(255, 255, 255) 0%)`,
        }}
      >
        <Avatar
          size={110}
          src={getUserAvatar(politician.id)}
          style={{
            border: "5px solid white",
          }}
        />
        <Typography.Title level={3}>
          {politician?.name}
        </Typography.Title>
        <Typography.Text type="secondary">{politician?.party}</Typography.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="">
            <Typography.Title level={4}>
                {politician?.interaction}
            </Typography.Title>
            <span>Tweets</span>
          </div>
          <div className="">
            <Typography.Title level={4}>{
                politician?.approvalRate
            }</Typography.Title>
            <span>Avg.Approval</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

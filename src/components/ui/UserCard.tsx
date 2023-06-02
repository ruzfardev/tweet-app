import React, { FC } from "react";
import { Card, Avatar, Typography } from "antd";
import { Link } from "react-router-dom";
import { IPolitician } from "../../model/politician.model";
import { getUserAvatar } from "../../helpers";
interface Props {
  politician: IPolitician;
  loading?: boolean;
}
export const UserCard: FC<Props> = ({ politician, loading }) => {
  return (
    <Link
      to={`/${politician?.account}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        loading={loading}
        hoverable={true}
        style={{
          textAlign: "center",
          padding: "15px, 8px",
          background: `linear-gradient(${politician.color} 30%, rgb(255, 255, 255) 0%)`,
        }}
      >
        <Avatar
          size={110}
          src={getUserAvatar(politician.account)}
          style={{
            border: "5px solid white",
          }}
        />
        <Typography.Title level={3}>{politician?.name}</Typography.Title>
        <Typography.Text type="secondary">{politician?.party}</Typography.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-rate">
            <Typography.Title
              ellipsis={true}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              level={3}
            >
              {politician?.interaction}
              <span>INTERACTIONS</span>
            </Typography.Title>
          </div>
          <div className="text-rate">
            <Typography.Title
              ellipsis={true}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              level={3}
            >
              {politician?.approvalRate + "%"}
              <span>AVG.APPROVALRATE</span>
            </Typography.Title>
          </div>
        </div>
      </Card>
    </Link>
  );
};

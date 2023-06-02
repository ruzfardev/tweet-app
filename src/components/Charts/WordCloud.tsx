import React from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { getUserWordCloud } from "../../helpers";

export const WordCloud = () => {
  const { userName } = useParams();
  return (
    <Card
      hoverable
      bordered={true}
      title={"Word Cloud by topic"}
      style={{
        height: "350px",
      }}
    >
      <img
        alt={"wordCloud"}
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        src={getUserWordCloud(userName)}
      />
    </Card>
  );
};

import React, { FC } from "react";
import { Card, Space, Spin, Typography } from "antd";
import { IMetricContainerProps } from "./types";

export const MetricsContainer: FC<IMetricContainerProps> = ({
  isLoading,
  data,
}) => {
  return (
    <div className="metric_container">
      {data.map((item, index) => {
        return (
          <Card hoverable bordered={true} loading={false}>
            <Space direction="vertical">
              <Typography.Title level={4} className="margin-0">
                {item.title}
              </Typography.Title>
              {isLoading ? (
                <Spin size="large" />
              ) : (
                <>
                  <Typography.Title level={4} className="margin-0">
                    {item.title.includes("engagement") && item.value
                      ? item.value.toFixed(3)
                      : item.value}
                  </Typography.Title>
                </>
              )}
            </Space>
          </Card>
        );
      })}
    </div>
  );
};

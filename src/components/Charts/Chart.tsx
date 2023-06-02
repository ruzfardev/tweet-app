import React, { FC } from "react";
import { Card } from "antd";
interface IProps {
  children?: React.ReactNode;
  loading: boolean;
}

const Chart: FC<IProps> = ({ children, loading }) => {
  return (
    <Card hoverable={true} bordered={true} loading={loading}>
      {children}
    </Card>
  );
};
export default Chart;

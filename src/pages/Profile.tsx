import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Typography, Space } from "antd";
import { useGlobalState } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import stc from "string-to-color";
const { Meta } = Card;
export const Profile = () => {
  const { userName } = useParams();
  const { state } = useGlobalState();
  const { users } = state;
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  useEffect(() => {
    const user = users?.find((user: any) => user.userName === userName);
    setSelectedUser(user);
  }, [users, userName]);

  return (
    <div className="profile">
      <Row align={"middle"} gutter={[50, 10]}>
        <Col span={18} push={6}>
          <Row wrap={true} style={{ height: "100%" }} justify="space-between">
            <Col style={{ textAlign: "center" }} span={4}>
              <Card bordered={false} style={{ width: 200 }}>
                <Space direction="vertical">
                  <Typography.Title level={5} className="margin-0">
                    Total number of tweets
                  </Typography.Title>
                  <Typography.Title level={2} className="margin-0">
                    1,200
                  </Typography.Title>
                </Space>
              </Card>
            </Col>
            <Col style={{ textAlign: "center" }} span={4}>
              <Card bordered={false} style={{ width: 200 }}>
                <Space direction="vertical">
                  <Typography.Title level={5} className="margin-0">
                    Average number of retweets
                  </Typography.Title>
                  <Typography.Title level={2} className="margin-0">
                    1,200
                  </Typography.Title>
                </Space>
              </Card>
            </Col>
            <Col style={{ textAlign: "center" }} span={4}>
              <Card bordered={false} style={{ width: 200 }}>
                <Space direction="vertical">
                  <Typography.Title level={5} className="margin-0">
                    Average number of likes
                  </Typography.Title>
                  <Typography.Title level={2} className="margin-0">
                    5,200
                  </Typography.Title>
                </Space>
              </Card>
            </Col>
            <Col style={{ textAlign: "center" }} span={4}>
              <Card bordered={false} style={{ width: 200 }}>
                <Space direction="vertical">
                  <Typography.Title level={5} className="margin-0">
                    Average number of replies
                  </Typography.Title>
                  <Typography.Title level={2} className="margin-0">
                    45%
                  </Typography.Title>
                </Space>
              </Card>
            </Col>
            <Col style={{ textAlign: "center" }} span={4}>
              <Card bordered={false} style={{ width: 200 }}>
                <Space direction="vertical">
                  <Typography.Title level={5} className="margin-0">
                    Total number of countries
                  </Typography.Title>
                  <Typography.Title level={2} className="margin-0">
                    115
                  </Typography.Title>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={6} pull={18}>
          <Card
            bordered={false}
            style={{
              background: `linear-gradient(150deg, ${stc(
                selectedUser && selectedUser?.firstName + selectedUser?.lastName
              )} 32%, rgb(255, 255, 255) 20%)`,
            }}
            loading={false}
          >
            <Meta
              avatar={
                <Avatar
                  style={{
                    border: "3px solid white",
                  }}
                  size={90}
                  src={selectedUser?.avatar}
                />
              }
              title={selectedUser?.firstName + " " + selectedUser?.lastName}
              description={selectedUser?.jobPosition}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

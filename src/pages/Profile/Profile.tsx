import React, { useEffect } from "react";
import { Row, Col, Card, Avatar, Typography, Space } from "antd";
import { useGlobalState } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import Chart from "../../components/Charts/Chart";
import { ApiService } from "../../service";
import {convertToLineGraphData, getUserAvatar} from "../../helpers";
import {ILineGraph} from "../../model/ILineGraph";
import {IPolitician} from "../../model/politician.model";
import {LineGraph} from "../../components/Charts/LineGraph";
const { Meta } = Card;
export const Profile = () => {
  const apiService = new ApiService();
  const { userName } = useParams();
  const { users } = useGlobalState();
  const [lineGraphData, setLineGraphData] = React.useState<ILineGraph>();
  const [selectedUser, setSelectedUser] = React.useState<IPolitician>({} as IPolitician);

  useEffect(() => {
    const user = users.find((user: IPolitician) => user.account === userName);
    console.log(userName, user);
    // @ts-ignore
    setSelectedUser(user);
    // apiService.getLineGraphData().then((res) => {
    //   setLineGraphData(convertToLineGraphData(res));
    // });
  }, [users, userName]);

  return (
      <>
      <div className="profile">
        <Row
           align={"middle"} gutter={[50, 10]}>
          <Col span={18} push={6}>
            <Row style={{ height: "100%" }} justify="space-between">
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
                background: `linear-gradient(150deg, ${selectedUser?.color} 32%, rgb(255, 255, 255) 20%)`,
              }}
              loading={false}
            >
              <Meta
                // avatar={
                //   // <Avatar
                //   //   style={{
                //   //     border: "3px solid white",
                //   //   }}
                //   //   size={90}
                //   //   src={
                //   //   getUserAvatar(selectedUser?.id)
                //   // }
                //   // />
                // }
                title={selectedUser?.name}
                description={selectedUser?.party}
              />
            </Card>
          </Col>
        </Row></div>
        <Row
            style={{
              backgroundColor: "#e9e9e9",
              padding: "0 30px",
            }}
            justify="center"

            gutter={[50, 10]}>
            <Col span={24}>
              <LineGraph />
              {/*{lineGraphData && <Chart options={lineGraphData}/>}*/}
        </Col>
        {/*<Col span={8}>*/}
        {/*/!*<Chart/>*!/*/}
        {/*</Col>*/}
        {/*<Col span={8}>*/}
        {/*/!*<Chart/>*!/*/}
        {/*</Col>*/}
        </Row>
        </>
  );
};

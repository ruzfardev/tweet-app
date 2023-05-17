import React, {ReactNode, useEffect} from "react";
import {Row, Col, Card, Avatar, Typography, Space, Spin, Skeleton} from "antd";
import { useGlobalState } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service";
import {getUserAvatar} from "../../helpers";
import {IPolitician} from "../../model/politician.model";
import {LineGraph} from "../../components/Charts/LineGraph";
import {HorizontalBarGraph} from "../../components/Charts/HorizontalBarGraph";
import {BarGraph} from "../../components/Charts/BarGraph";
import {Map} from "../../components/Charts/Map";
import {useQuery} from "@tanstack/react-query";
import {PieChart} from "../../components/Charts/PieChart";
import {WordCloud} from "../../components/Charts/WordCloud";
import {KetMetricsModel} from "../../model/ketMetrics.model";
const { Meta } = Card;
export const Profile = () => {
  const apiService = new ApiService();
  const { userName } = useParams();
  const { users } = useGlobalState();
  const [keyMetrics, setKeyMetrics] = React.useState<KetMetricsModel>();
  const [selectedUser, setSelectedUser] = React.useState<IPolitician | undefined>({} as IPolitician);

  useEffect(() => {
    // when the component mounts, scroll to the top of the page
    window.scrollTo(0, 0);
    const user = users.find((user: IPolitician) => user.id === userName);
    setSelectedUser(user);
  }, [users, userName]);

  const {isLoading} = useQuery({
    queryKey: ['keyMetrics', userName],
    queryFn: () => apiService.getKeyMetrics(userName),
    onSuccess: (data) => {
      setKeyMetrics(data[0])
    }
  });
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
                    {
                      isLoading
                        ? <Spin size="large" />
                        :
                          <>
                            <Typography.Title level={2} className="margin-0">
                                    {keyMetrics?.totalTweets}
                            </Typography.Title>
                          </>
                    }
                  </Space>
                </Card>
              </Col>
              <Col style={{ textAlign: "center" }} span={4}>
                <Card bordered={false} style={{ width: 200 }}>
                  <Space direction="vertical">
                    <Typography.Title level={5} className="margin-0">
                      Average number of retweets
                    </Typography.Title>
                    {
                      isLoading
                          ? <Spin size="large" />
                          :
                          <>
                            <Typography.Title level={2} className="margin-0">
                              {keyMetrics?.avgRetweets}
                            </Typography.Title>
                          </>
                    }
                  </Space>
                </Card>
              </Col>
              <Col style={{ textAlign: "center" }} span={4}>
                <Card bordered={false} style={{ width: 200 }}>
                  <Space direction="vertical">
                    <Typography.Title level={5} className="margin-0">
                      Average number of likes
                    </Typography.Title>
                    {
                      isLoading
                          ? <Spin size="large" />
                          :
                          <>
                            <Typography.Title level={2} className="margin-0">
                              {keyMetrics?.avgLikes}
                            </Typography.Title>
                          </>
                    }
                  </Space>
                </Card>
              </Col>
              <Col style={{ textAlign: "center" }} span={4}>
                <Card bordered={false} style={{ width: 200 }}>
                  <Space direction="vertical">
                    <Typography.Title level={5} className="margin-0">
                        Total number of topics
                    </Typography.Title>
                    {
                      isLoading
                          ? <Spin size="large" />
                          :
                          <>
                            <Typography.Title level={2} className="margin-0">
                              {keyMetrics?.totalTopics}
                            </Typography.Title>
                          </>
                    }
                  </Space>
                </Card>
              </Col>
              <Col style={{ textAlign: "center" }} span={4}>
                <Card bordered={false} style={{ width: 200 }}>
                  <Space direction="vertical">
                    <Typography.Title level={5} className="margin-0">
                      Total number of cities
                    </Typography.Title>
                    {
                      isLoading
                          ? <Spin size="large" />
                          :
                          <>
                            <Typography.Title level={2} className="margin-0">
                              {keyMetrics?.totalCities}
                            </Typography.Title>
                          </>
                    }
                  </Space>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={6} pull={18}>
            {
              isLoading ?
                  <Card >
                    <Skeleton active avatar={{ size: 55 }} paragraph={{ rows: 1 }} />
                  </Card>
                    :
                  <Card
                      bordered={false}
                      style={{
                        background: `linear-gradient(90deg, ${keyMetrics?.color} 15%, rgb(255, 255, 255) 15%)`,
                      }}
                  >
                    <Meta
                        avatar={
                          <Avatar
                              style={{
                                border: "3px solid white",
                              }}
                              size={90}
                              src={
                                  keyMetrics && getUserAvatar(keyMetrics.politicianId)
                              }
                          />
                        }
                        title={keyMetrics?.politicianName}
                        description={keyMetrics?.politicianParty}
                    />
                  </Card>
            }
          </Col>
        </Row>
      </div>
        <Row
            style={{
              backgroundColor: "#e9e9e9",
              padding: "30px",
            }}
            justify="center"
            gutter={[30, 30]}
        >
            <Col span={8}>
              <LineGraph />
            </Col>
            <Col span={8}>
              <HorizontalBarGraph key={1}/>
            </Col>
            <Col span={8}>
              <BarGraph />
            </Col>
          <Col span={8}>
            <Map/>
          </Col>
          <Col span={8}>
            <WordCloud/>
          </Col>
            <Col span={8}>
              <PieChart />
            </Col>
        </Row>
        </>
  );
};

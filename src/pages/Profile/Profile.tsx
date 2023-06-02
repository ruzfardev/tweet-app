import React, { ReactNode, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Typography,
  Space,
  Spin,
  Skeleton,
} from "antd";
import { useGlobalState } from "../../context/GlobalContext";
import { useParams } from "react-router-dom";
import { ApiService } from "../../service";
import { getUserAvatar } from "../../helpers";
import { IPolitician } from "../../model/politician.model";
import { ClusteredBarChart } from "../../components/Charts/ClusteredBarChart";
import { StackedBarChart } from "../../components/Charts/StackedBarChart";
import { BarGraph } from "../../components/Charts/BarGraph";
import { Map } from "../../components/Charts/Map";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "../../components/Charts/PieChart";
import { WordCloud } from "../../components/Charts/WordCloud";
import { KetMetricsModel } from "../../model/ketMetrics.model";
import { MultiGraph } from "../../components/Charts/MultiGraph";
import { MetricsContainer } from "../../components/ui/container/MetricsContainer";
const { Meta } = Card;
export const Profile = () => {
  const apiService = new ApiService();
  const { userName } = useParams();
  const { users } = useGlobalState();
  const [keyMetrics, setKeyMetrics] = React.useState<KetMetricsModel>();
  const [selectedUser, setSelectedUser] = React.useState<
    IPolitician | undefined
  >({} as IPolitician);

  useEffect(() => {
    // when the component mounts, scroll to the top of the page
    window.scrollTo(0, 0);
    const user = users.find((user: IPolitician) => user.id === userName);
    setSelectedUser(user);
  }, [users, userName]);

  const { isLoading } = useQuery({
    queryKey: ["keyMetrics", userName],
    queryFn: () => apiService.getKeyMetrics(userName),
    onSuccess: (data) => {
      setKeyMetrics(data[0]);
    },
  });
  return (
    <>
      {/*<div className="profile">*/}
      {/*  <Row align={"middle"} gutter={[50, 10]}>*/}
      {/*    <Col span={18} push={6}></Col>*/}
      {/*    <Col span={6} pull={18}>*/}
      {/*      {isLoading ? (*/}
      {/*        <Card>*/}
      {/*          <Skeleton*/}
      {/*            active*/}
      {/*            avatar={{ size: 55 }}*/}
      {/*            paragraph={{ rows: 1 }}*/}
      {/*          />*/}
      {/*        </Card>*/}
      {/*      ) : (*/}
      {/*        <Card*/}
      {/*          bordered={false}*/}
      {/*          style={{*/}
      {/*            background: `linear-gradient(90deg, ${keyMetrics?.color} 15%, rgb(255, 255, 255) 15%)`,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <Meta*/}
      {/*            avatar={*/}
      {/*              <Avatar*/}
      {/*                style={{*/}
      {/*                  border: "3px solid white",*/}
      {/*                }}*/}
      {/*                size={90}*/}
      {/*                src={keyMetrics && getUserAvatar(keyMetrics.politicianId)}*/}
      {/*              />*/}
      {/*            }*/}
      {/*            title={keyMetrics?.politicianName}*/}
      {/*            description={keyMetrics?.party}*/}
      {/*          />*/}
      {/*        </Card>*/}
      {/*      )}*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</div>*/}
      <Row
        style={{
          background: `#64646433`,
          padding: "30px 40px",
          margin: "0px",
        }}
        wrap
        gutter={[16, 16]}
      >
        <Col span={7}>
          <WordCloud />
        </Col>
        <Col span={7}>
          <BarGraph />
        </Col>
        <Col span={7}>
          <PieChart />
        </Col>
        <Col span={3}>
          <MetricsContainer
            data={[
              {
                title: "Total Likes",
                value: keyMetrics?.totalLikes,
              },
              {
                title: "Total Retweets",
                value: keyMetrics?.totalReTweets,
              },
            ]}
            isLoading={isLoading}
          />
        </Col>
        <Col span={10}>
          <StackedBarChart />
        </Col>
        <Col span={11}>
          <ClusteredBarChart />
        </Col>
        <Col span={3}>
          <MetricsContainer
            data={[
              {
                title: "Overall Engagement Rate",
                value: keyMetrics?.totalEngagementRate,
              },
              {
                title: "Total Followers",
                value: 133453,
              },
            ]}
            isLoading={isLoading}
          />
        </Col>
        <Col span={24}>
          <MultiGraph />
        </Col>
      </Row>
    </>
  );
};

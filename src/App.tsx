import React from "react";
import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Menu, Typography, Layout } from "antd";
import Main from "./pages/Main";
import { Profile } from "./pages/Profile/Profile";


const { Header } = Layout;
function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {pathname === "/" ? (
          <Typography.Title
            style={{
              color: "white",
              margin: 0,
            }}
            level={3}
          >
            politweets
          </Typography.Title>
        ) : (
          <Button ghost size="large" icon={<LeftOutlined />}>
            <Link to="/">Back</Link>
          </Button>
        )}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: 1,
              label: <Link to="/">Overview</Link>,
            },
            {
              key: 2,
              label: <Link to="/">Interactions</Link>,
            },
            {
              key: 3,
              label: <Link to="/">Trends</Link>,
            },
            {
              key: 4,
              label: <Link to="/">Get in touch</Link>,
            },
          ]}
        />
      </Header>

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/:userName" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;

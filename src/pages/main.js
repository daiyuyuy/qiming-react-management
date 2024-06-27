import { Outlet } from "react-router-dom";
import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CommonAside from "../components/commonAside";
import CommonHeader from "../components/commonHeader";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //获取展开收起的状态State
  const collapsed = useSelector((state) => state.tab.isCollapse);
  return (
    <Layout className="main-container">
      <CommonAside collapsed={collapsed}/>
      <Layout>
        <CommonHeader collapsed={collapsed}/>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
       
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;

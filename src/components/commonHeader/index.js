import React from "react";
import "./index.css";
import { Button, Layout, Avatar, Badge, Space, Dropdown } from "antd";
import { useDispatch } from "react-redux";
import { MenuFoldOutlined } from "@ant-design/icons";
//导入reducer
import { collapseMenu } from "../../store/reducers/tab";
const { Header } = Layout;

const CommonHeader = ({ collapsed }) => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => logout}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          退出
        </a>
      ),
    },
  ];

  const logout = () => {};

  //dispatch
  const dispatch = useDispatch();

  //header栏点击按钮收起
  const setCollapsed = () => {
    console.log(collapsed);
    //更新collapseMenu,更新收起展开按钮的状态
    dispatch(collapseMenu());
  };
  return (
    <Header className="header-container">
      <Button
        type="text"
        icon={<MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 34,
          height: 34,
          backgroundColor: "#fff",
        }}
        onClick={() => {
          setCollapsed();
        }}
      />
      <Dropdown
        menu={{
          items,
        }}
      >
        <Space>
          <Badge>
            <Avatar
              size={36}
              shape="square"
              src={<img src={require("../../assets/images/cat.png")} />}
            />
          </Badge>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;

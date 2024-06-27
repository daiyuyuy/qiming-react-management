import React from "react";

// import { MenuConfig } from "antd/es/config-provider/context";
// import { MenuConfig } from "../../config";
//拿到config菜单数据
import MenuConfig from "../../config/index";
import * as Icon from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


import { Layout, Menu } from "antd";

const { Sider } = Layout;

//动态获取icon
const iconElement = (name) => React.createElement(Icon[name]);

//处理菜单的数据
const items = MenuConfig.map((icon) => {
  //没有子菜单
  const child = {
    key: icon.path,
    icon: iconElement(icon.icon),
    label: icon.label,
  };

  //有子菜单
  if (icon.children) {
    child.children = icon.children.map((item) => {
      return {
        key: item.path,
        label: item.label,
      };
    });
  }
  return child;
});




const CommonAside = ({ collapsed }) => {
  console.log(collapsed, "aside");
  const navigate=useNavigate()
  
  //点击菜单
  const selectMenu = (e) => {
    console.log(e);
    
    //路由,跳转
    navigate(e.key)
  }

  return (
    //collapsible是否可以收起
    //collapsed当前收起状态,boolean值
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="title-name">{collapsed ? "dy" : "dy后台管理系统"}</h3>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
        style={{
          //  height:"100%"
          height: "100vh",
        }}
        onClick={selectMenu}
      />
    </Sider>
  );
};
export default CommonAside;

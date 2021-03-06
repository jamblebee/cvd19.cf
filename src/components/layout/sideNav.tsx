import { Drawer, Layout, Menu, Tooltip } from "antd";
import logo from "assets/cvd4.svg";
import { myContext } from "context";
import { Link } from "gatsby";
import { menuInit } from "lib";
import React, { useContext, useEffect } from "react";

import {
  BarChartOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useLocation } from "@reach/router";

import { SideDrawer } from "./sideDrawer";

const { Sider } = Layout;

export const SideNav = (): JSX.Element => {
  const {
    handleSelect,
    showDrawer,
    onClose,
    visible,
    choice = { key: "main" },
  } = useContext(myContext);
  useEffect(() => {
    const initiaValue = menuInit(pathname);
    if (handleSelect) {
      handleSelect({ selectedKeys: initiaValue });
    };
  }, []);
  const { pathname } = useLocation();

  return (
    <>
      <Sider
        collapsed={true}
        style={{ position: "sticky" }}
        className="sider-box-shadow"
      >
        <Menu
          onSelect={handleSelect}
          selectable={true}
          focusable={true}
          selectedKeys={[choice.key as string]}
          mode="inline"
          style={{ position: "fixed", border: "0" }}
        >
          <div className="cvd">
            <div className="logoImg">
              <a href="https://cvd19.cf" title="Covid-19 pandemic dashboard">
                  <img
                    src={logo}
                    alt="Covid-19 stats & facts"
                    height={36}
                    width={36}
                  />
              </a>
              </div>  
            <span className="logoText">cvd19.cf</span>
          </div>
          <Menu.Item
            key="main"
            icon={<GlobalOutlined style={{ color: "WHITE" }} />}
          >
            <Link to="/">Status</Link>
          </Menu.Item>
          <Menu.Item
            key="data"
            icon={<BarChartOutlined style={{ color: "WHITE" }} />}
          >
            <Link to="/data">Data</Link>
          </Menu.Item>
          <Menu.Item
            key="map"
            icon={<EnvironmentOutlined style={{ color: "WHITE" }} />}
          >
            <Link to="/map">Map</Link>
          </Menu.Item>
          <Menu.Item
            key="about"
            icon={<UserOutlined style={{ color: "WHITE" }} />}
          >
            <Link to="/about">About</Link>
          </Menu.Item>
          <div className="alignBottom">
            <Tooltip title="Get help">
              <QuestionCircleOutlined className="helpIcon" onClick={showDrawer}/> 
            </Tooltip>

          </div>
        </Menu>
        <Drawer
          title="Data trends in colors"
          placement="left"
          closable={true}
          onClose={onClose}
          visible={visible?.isVisible}
          width={480}
        >
          <SideDrawer />
        </Drawer>
      </Sider>
      </>
  );
};

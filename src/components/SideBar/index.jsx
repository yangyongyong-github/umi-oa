import React from 'react';
import logo from 'common/img/logo.png';
import { history, Link } from 'umi';
import iconMap from 'components/IconMap';

const SideBar = ({ Sider, Menu, collapse }) => {
  const pathname = history.location.pathname;
  const routeList = sessionStorage.getItem('routeList')
    ? JSON.parse(sessionStorage.getItem('routeList'))
    : [];
  return (
    <Sider theme="light" className="side-bar" collapsed={collapse}>
      <div className="brand">
        <div className="logo">
          <img src={logo} alt="" />
          {!collapse && <h1>OA</h1>}
        </div>
      </div>
      <div className="menu-container">
        <Menu mode="inline" selectedKeys={[pathname]}>
          {routeList?.map((item) => {
            return (
              <Menu.Item key={item.route}>
                <Link to={item.route}>
                  {iconMap[item.icon]}
                  <span>{item.zhName}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    </Sider>
  );
};

export default SideBar;

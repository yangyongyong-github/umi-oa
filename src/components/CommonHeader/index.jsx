// @ts-nocheck
import React from 'react';
import iconMap from 'components/IconMap';
import { Avatar, Menu } from 'antd';
import defaultAvatarIcon from 'common/img/default_avatar.png';
import { useSelector } from 'umi';
const { SubMenu, Divider, Item } = Menu;

const CommonHeader = ({ Header, collapse, changeCollapse }) => {
  const { userInfo } = useSelector((state) => state.user);
  const MenuTitle = (
    <>
      <span>{userInfo.userName}</span>
      <Avatar
        style={{ marginLeft: 0 }}
        src={userInfo.avatar || defaultAvatarIcon}
      />
    </>
  );

  //- 用户退出按钮点击
  const signOut = () => {
    sessionStorage.clear();
    window.location.href = '/users/login';
  };

  return (
    <Header className="header-wrapper">
      <div className="button" onClick={changeCollapse}>
        {collapse ? iconMap.rightArrow : iconMap.leftArrow}
      </div>
      <Menu mode="horizontal">
        <SubMenu key={['1']} title={MenuTitle}>
          <Divider />
          <Item key="4" icon={iconMap.signOut} onClick={signOut}>
            <span>退出</span>
          </Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default CommonHeader;

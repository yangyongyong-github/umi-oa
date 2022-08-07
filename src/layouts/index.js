// @ts-nocheck
import React from 'react';
import { ConfigProvider } from 'antd';
import { selectLayout } from 'utils/selectLayout';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';
import zhCN from 'antd/es/locale/zh_CN';
//- 创建loading组件，引入组件
import Loading from 'components/Loading';
import { useSelector } from 'umi';

const Layout = ({ children, location }) => {
  const layoutMap = { BaseLayout, LoginLayout };
  const loading = useSelector((state) => state.loading);
  const Container = layoutMap[selectLayout(location.pathname)];
  return (
    <ConfigProvider locale={zhCN}>
      <Container>
        <Loading isShow={loading.effects['user/login']} />
        {children}
      </Container>
    </ConfigProvider>
  );
};

export default Layout;

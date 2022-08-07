// @ts-nocheck
import React from 'react';
import { Drawer, Modal, message } from 'antd';
import { useSelector, useDispatch } from 'umi';
import iconMap from 'components/IconMap';
import './index.less';
import $http from 'api';

const DrawerComponent = ({ title, interfaceName, _id, render, reloadList }) => {
  const { isShowDetailDialog } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  //- 打开删除的对话框
  const openModelDialog = () => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除当前信息么?',
      onOk: _deleteItem,
    });
  };

  //- 删除指定的列表项（详情展示的这一项数据）
  const _deleteItem = async () => {
    const { code, msg } = await $http[interfaceName]({ ids: [_id] });
    if (code) return;
    message.success(msg);
    closeDialog();
    reloadList();
  };

  //- 关闭弹窗
  const closeDialog = () => {
    dispatch({
      type: 'common/setShowDetailDialog',
      payload: { isShowDetailDialog: false },
    });
  };
  /* 左边头部内容 */
  const titleNode = (
    <>
      <span>{iconMap.copy}</span>
      <span>{title}</span>
    </>
  );

  const extra = (
    <>
      <span className="icon" onClick={openModelDialog}>
        {iconMap.del}
      </span>
      <span className="line"></span>
      <span className="icon" onClick={closeDialog}>
        {iconMap.close}
      </span>
    </>
  );

  return (
    <Drawer
      title={titleNode}
      placement="right"
      width={800}
      closable={false}
      destroyOnClose={true}
      visible={isShowDetailDialog}
      extra={extra}
    >
      {render()}
    </Drawer>
  );
};

export default DrawerComponent;

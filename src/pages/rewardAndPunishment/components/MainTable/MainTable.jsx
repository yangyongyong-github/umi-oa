import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';
import Columns from '../Columns/Columns';
import $http from 'api';
import { EditableRow, EditableCell } from 'components/Editable';

const MainTable = ({ rewardList, reloadPage }) => {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  //- 修改奖惩记录
  const handleSave = async (value) => {
    let { code, msg } = await $http.updateReward(value);
    if (!code) {
      message.success(msg);
      reloadPage();
    }
  };

  // - 获取详情
  const getSalaryAdjustmentDetail = (_id) =>
    dispatch({ type: 'reward/_getRewardDetail', payload: { _id } });

  //- 选中多条信息
  const onSelectChange = (selectedIds) => {
    dispatch({ type: 'common/saveSelectedIds', payload: { selectedIds } });
  };

  return (
    <div className="table-container">
      <Table
        scroll={{ x: '100%' }}
        components={{ body: { row: EditableRow, cell: EditableCell } }}
        bordered
        loading={loading.effects['reward/_initReward']}
        rowKey={(record) => record._id}
        pagination={false}
        rowSelection={{ onChange: onSelectChange }}
        dataSource={rewardList}
        columns={Columns(handleSave, getSalaryAdjustmentDetail)}
      />
    </div>
  );
};

export default MainTable;

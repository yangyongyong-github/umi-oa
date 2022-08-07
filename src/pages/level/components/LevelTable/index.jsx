import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';
import Columns from '../Columns';
import { EditableRow, EditableCell } from 'components/Editable';
import $http from 'api';

const LevelTable = ({ levelList, reloadPage }) => {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  //- 修改职级
  const handleSave = async (updateObj) => {
    const { code, msg } = await $http.updateLevelDetail(updateObj);
    if (code) return;
    message.success(msg);
    reloadPage();
  };

  // - 获取详情
  const getLevelDetail = (_id) =>
    dispatch({ type: 'level/_getLevelDetail', payload: { _id } });

  //- 选中多条信息
  const onSelectChange = (ids) => {
    console.log(ids);
    dispatch({ type: 'common/saveSelectIds', payload: { ids } });
  };

  return (
    <Table
      components={{ body: { row: EditableRow, cell: EditableCell } }}
      bordered
      loading={loading.effects['level/_initLevelList']}
      rowKey={(record) => record._id}
      pagination={false}
      rowSelection={{ onChange: onSelectChange }}
      dataSource={levelList}
      columns={Columns(handleSave, getLevelDetail)}
    />
  );
};

export default LevelTable;

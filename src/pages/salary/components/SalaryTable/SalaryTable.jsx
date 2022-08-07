import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';
import Columns from '../Columns/Columns';
import $http from 'api';
import { EditableRow, EditableCell } from 'components/Editable';

const SalaryTable = ({ salaryList, reloadPage }) => {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  //- 修改薪资
  const handleSave = async (value) => {
    let { code, msg } = await $http.updateSalaryDetail(value);
    if (!code) {
      message.success(msg);
      reloadPage();
    }
  };

  // - 获取详情
  const getSalaryAdjustmentDetail = (_id) =>
    dispatch({ type: 'salary/_getSalaryDetail', payload: { _id } });

  //- 选中多条信息
  const onSelectChange = (ids) => {
    dispatch({ type: 'common/saveSelectIds', payload: { ids } });
  };

  return (
    <Table
      components={{ body: { row: EditableRow, cell: EditableCell } }}
      bordered
      loading={loading.effects['salary/_initSalaryList']}
      rowKey={(record) => record._id}
      pagination={false}
      rowSelection={{ onChange: onSelectChange }}
      dataSource={salaryList}
      columns={Columns(handleSave, getSalaryAdjustmentDetail)}
    />
  );
};

export default SalaryTable;

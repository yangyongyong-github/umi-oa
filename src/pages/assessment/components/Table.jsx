import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';
import Columns from './Columns';
import $http from 'api';
import { EditableRow, EditableCell } from 'components/Editable';

const AssessmentTable = ({ assessmentList, reloadPage }) => {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  //- 修改
  const handleSave = async (value) => {
    const { code, msg } = await $http.updateAssessmentDetail(value);
    if (code) return;
    message.success(msg);
    reloadPage();
  };

  // - 获取详情
  const getAssessmentDetail = (_id) =>
    dispatch({ type: 'assessment/getAssessmentInfo', payload: { _id } });

  //- 选中多条信息
  const onSelectChange = (ids) => {
    dispatch({ type: 'common/saveSelectIds', payload: { ids } });
  };
  return (
    <Table
      components={{ body: { row: EditableRow, cell: EditableCell } }}
      bordered
      rowKey={(record) => record._id}
      pagination={false}
      loading={loading.effects['level/_initLevelList']}
      rowSelection={{ onChange: onSelectChange }}
      dataSource={assessmentList}
      columns={Columns(handleSave, getAssessmentDetail)}
    />
  );
};

export default AssessmentTable;

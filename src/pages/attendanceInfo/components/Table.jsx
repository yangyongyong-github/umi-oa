import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, message } from 'antd';
import Columns from './Columns'
import $http from 'api';
import { EditableRow, EditableCell } from 'components/Editable';


const AttendanceTable = ({ attendanceList, reloadPage }) => {
  const { loading } = useSelector((state) => state);
  const dispatch = useDispatch();

  //- 修改职级
  const handleSave = async (value) => {
    const { code, msg } = await $http.updateAttendance(value);
    if (code) return
    message.success(msg);
    reloadPage();
  };

  // - 获取详情
  const getAssessmentDetail = (_id) => dispatch({ type: 'attendanceInfo/getAttendanceDetail', payload: { _id } })

  //- 选中多条信息
  const onSelectChange = (ids) => {
    dispatch({ type: 'common/saveSelectIds', payload: { ids } });
  };

  return (
    <div className="table-container">
      <Table
        components={{ body: { row: EditableRow, cell: EditableCell } }}
        bordered
        rowKey={(record) => record._id}
        loading={loading.effects['attendanceInfo/_initAttendanceList']}
        pagination={false}
        rowSelection={{ onChange: onSelectChange }}
        dataSource={attendanceList}
        columns={Columns(handleSave, getAssessmentDetail)}
      />
    </div>
  );
};

export default AttendanceTable;

import React from 'react';
import { Table, Tag } from 'antd';
import { formatDate } from 'utils/format';

const ViolationTable = ({ title, renderList }) => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'staffName',
      render: (x) => x?.userName || '--',
    },
    {
      title: '考勤时间',
      dataIndex: 'createTime',
      render: (createTime) => formatDate(createTime, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '考勤类型',
      dataIndex: 'attendanceType',
      render: (attendanceType) => (
        <Tag color="red">{attendanceType === 4 ? '迟到' : '早退'}</Tag>
      ),
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      render: (x) => (
        <Tag>
          {x?.department ? x.department.departmentName : '暂无部门信息'}
        </Tag>
      ),
    },
  ];
  return (
    <div className="block-container">
      <div className="title">{title}</div>
      <Table
        dataSource={renderList}
        rowKey={(columns) => columns._id}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default ViolationTable;

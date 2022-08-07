import React, { useState } from 'react';
import { Table, message } from 'antd';
import { EditableRow, EditableCell } from 'components/Editable';
import Columns from './Columns';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';
import $http from 'api';
import { useDispatch } from 'umi';

const TableList = ({ userInfo, staffList, loading, reloadPage }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [dialogStatus, setDialogStatus] = useState(false);
  const dispatch = useDispatch();

  //- 修改成功之后的保存事件
  const handleSave = async (obj) => {
    if (obj.type === 'mobile') {
      const checkData = { mobile: obj.updateVal };
      const { data, msg } = await $http.checkIsExists({ checkData });
      if (data) return message.error(msg);
    }
    //- 修改表单操作
    const { code, msg } = await $http.updateStaff(obj);
    if (code) return message.error(msg);
    message.success(msg);
    reloadPage();
  };

  //- 打开员工指定表格
  const openReviewRecord = (record) => {
    setCurrentRecord(record);
    setDialogStatus(true);
  };

  //- 打开员工详情界面
  const openDetailDialog = (_id) => {
    dispatch({ type: 'staff/_getStaffDetail', payload: { _id } });
  };

  //- 单选全选按钮触发函数
  const onselectChange = (ids) => {
    dispatch({
      type: 'common/saveSelectIds',
      payload: {
        ids,
      },
    });
  };

  return (
    <>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        bordered
        scroll={{ x: true }}
        dataSource={staffList}
        pagination={false}
        rowKey={(record) => record._id}
        loading={loading.effects['staff/_initStaffList']}
        rowSelection={{ onChange: onselectChange }}
        columns={Columns({
          userInfo,
          handleSave,
          openReviewRecord,
          openDetailDialog,
        })}
      />
      <Dialog
        title={currentRecord?.title}
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        render={() => <RecordTable {...currentRecord} />}
      />
    </>
  );
};

export default TableList;

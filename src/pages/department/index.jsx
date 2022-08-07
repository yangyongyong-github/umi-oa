import React, { useState } from 'react';
import { Button } from 'antd';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'umi';
import iconMap from 'components/IconMap';
import Tree from './component/Tree';
import Dialog from 'components/Dialog';
import FormComponent from './component/FormComponent';

const department = () => {
  const { collapse } = useSelector((state) => state.common);
  const [modalTitle, setModalTitle] = useState('创建部门');
  const [modalType, setModalType] = useState('update');
  const { showModalDialog } = useSelector((state) => state.department);
  const dispatch = useDispatch();

  //- 新增部门弹窗打开
  const openDialog = () => {
    dispatch({
      type: 'department/saveDepartmentDetail',
      payload: { departmentDetail: null },
    });
    setDialogStatus(true);
    setModalTitle('创建部门');
    setModalType('add');
  };

  //- 点击树状图获取部门详情
  const getDepartmentDetail = (_id, name) => {
    setModalTitle(name);
    setModalType('update');
    dispatch({
      type: 'department/_getDepartmentDetail',
      payload: { _id },
    });
  };

  //- 管理弹出的状态
  const setDialogStatus = (status) => {
    dispatch({
      type: 'department/saveShowModalDialog',
      payload: {
        showModalDialog: status,
      },
    });
  };

  //- 指定弹窗头部内容生成
  const modalTitleComponent = (
    <div className="department-modal-title">
      <span className="ft-b">{modalTitle}</span>
      {modalType === 'update' && (
        <span className="delete-icon">{iconMap.del}</span>
      )}
    </div>
  );

  return (
    <div className="department-container">
      {/* 头部内容 */}
      <Button
        className={classnames('create-department-btn', { small: collapse })}
        size="small"
        shape="round"
        icon={iconMap.add}
        onClick={openDialog}
      >
        创建
      </Button>
      <Tree getDepartmentDetail={getDepartmentDetail} />
      {/* 新增部门与部门详情对话框 */}
      <Dialog
        title={modalTitleComponent}
        dialogStatus={showModalDialog}
        setDialogStatus={setDialogStatus}
        width={800}
        className="department-detail-modal"
        render={() => (
          <FormComponent
            setDialogStatus={setDialogStatus}
            modalType={modalType}
          />
        )}
      />
    </div>
  );
};

export default department;

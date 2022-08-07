import React, { useState } from 'react';
import { Form, Button, Input, Row, Descriptions } from 'antd';
import { departmentRule } from 'utils/rules';
import ChildDepartment from '../ChildDepartment';
import DropPopover from 'components/DropPopover';
import StaffTable from '../StaffTable';
import { useDispatch, useSelector } from 'umi';
import './index.less';

const FormComponent = ({ modalType, setDialogStatus }) => {
  const [childList, setChildList] = useState([]);
  const dispatch = useDispatch();
  const { departmentDetail } = useSelector((state) => state.department);

  //- 新增表单提交
  const _onFinish = (data) => {
    const children = form.getFieldValue('children');
    const departmentLeader = form.getFieldValue('departmentLeader');
    delete data.departmentLeaderName;
    dispatch({
      type: 'department/_addDepartment',
      payload: {
        departmentLeader,
        children,
        ...data,
      },
    });
    setDialogStatus(false);
  };

  //- 新增子部门或修改子部门
  const pushOrUpdateList = ({ list, type }) => {
    const childrenIds = list.map((item) => item._id);
    if (type === 'update' || type === 'del') {
      const isDelete = type === 'del';
      updateDepartment({ type: 'children', updateVal: childrenIds, isDelete });
    } else {
      console.log(list);
      setChildList(list);
      form.setFieldsValue({ children: childrenIds });
    }
  };

  //- 修改部门信息
  const updateDepartment = ({ type, updateVal, isDelete = false }) => {
    if (!updateVal) {
      updateVal = form.getFieldValue(type);
      //- 判断新旧值是否相等
      if (updateVal === departmentDetail[type]) return;
    }
    dispatch({
      type: 'department/updateDepartmentDetail',
      payload: {
        _id: departmentDetail._id,
        type,
        updateVal,
        isDelete,
      },
    });
  };

  const [form] = Form.useForm();
  return (
    <Form
      initialValues={{
        departmentName: departmentDetail?.departmentName,
        remark: departmentDetail?.remark,
        departmentLeaderName: departmentDetail?.departmentLeader?.userName,
      }}
      form={form}
      onFinish={_onFinish}
    >
      <Descriptions column={1} labelStyle={{ width: '150px' }} bordered>
        <Descriptions.Item label="部门名称">
          <Form.Item
            name="departmentName"
            rules={departmentRule.departmentName}
          >
            <Input
              onBlur={() => {
                modalType === 'update' &&
                  updateDepartment({ type: 'departmentName' });
              }}
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="备注">
          <Form.Item name="remark">
            <Input
              onBlur={() => {
                modalType === 'update' && updateDepartment({ type: 'remark' });
              }}
            />
          </Form.Item>
        </Descriptions.Item>

        <Descriptions.Item label="子部门">
          <ChildDepartment
            childList={
              modalType === 'update' ? departmentDetail?.children : childList
            }
            pushOrUpdateList={pushOrUpdateList}
            departmentDetail={departmentDetail}
          />
        </Descriptions.Item>

        <Descriptions.Item label="部门负责人">
          <Form.Item
            name="departmentLeaderName"
            rules={departmentRule.departmentLeader}
          >
            <Input
              placeholder="请输入部门负责人"
              readOnly
              className="border-1"
              addonAfter={
                <DropPopover
                  placeholderVal="请输入查找的员工姓名"
                  interfaceName="getStaffList"
                  searchType="userName"
                  getSelectItem={(item) => {
                    form.setFieldsValue({
                      departmentLeaderName: item.userName,
                      departmentLeader: item._id,
                    });
                    updateDepartment({ type: 'departmentLeader' });
                  }}
                />
              }
            />
          </Form.Item>
        </Descriptions.Item>

        {modalType === 'update' && (
          <Descriptions.Item label="部门员工">
            <StaffTable staffList={departmentDetail.staffList} />
          </Descriptions.Item>
        )}
      </Descriptions>
      {modalType === 'add' && (
        <Form.Item>
          <Row justify="end">
            <Button className="mt-20" type="primary" htmlType="submit">
              创建
            </Button>
          </Row>
        </Form.Item>
      )}
    </Form>
  );
};

export default FormComponent;

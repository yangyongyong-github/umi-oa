import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DropPopover from 'components/DropPopover';
import $http from 'api';

const FilterForm = ({ reload }) => {
  const [form] = Form.useForm();
  const { isClearForm } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClearForm) {
      form.resetFields();
      reload();
      dispatch({ type: 'common/clearForm', payload: { isClearForm: false } })
    }
  }, [isClearForm])


  const searchVal = (data) => {
    form.setFieldsValue({ staffName: data.userName })
    reload({ staffName: data._id });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="员工" name="staffName">
        <Input readOnly placeholder="请输入搜索的员工" addonAfter={
          <>
            <DropPopover
              placeholderVal="请输入员工"
              interfaceName="getStaffList"
              searchType="userName"
              getSelectItem={(item) => searchVal(item)}
            />
          </>
        } />
      </Form.Item>
    </Form>
  )
};

export default FilterForm;

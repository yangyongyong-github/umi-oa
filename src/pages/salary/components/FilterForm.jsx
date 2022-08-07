import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DropPopover from 'components/DropPopover';

const FilterForm = ({ reload }) => {
  const [form] = Form.useForm();
  const { isClearForm } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClearForm) {
      form.resetFields();
      reload({});
      dispatch({ type: 'common/clearForm', payload: { isClearForm: false } });
    }
  }, [isClearForm]);

  const searchVal = (data) => {
    form.setFieldsValue({ staffName: data.userName, staffId: data._id });
    reload({ staffName: data._id });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="调薪员工" name="staffName">
        <Input
          readOnly
          placeholder="请输入搜索的员工"
          addonAfter={
            <DropPopover
              placeholderVal="请输查询的员工"
              interfaceName="getStaffList"
              searchType="userName"
              getSelectItem={(item) => searchVal(item)}
            />
          }
        />
      </Form.Item>
      <Form.Item style={{ display: 'none' }} name="staffId">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FilterForm;

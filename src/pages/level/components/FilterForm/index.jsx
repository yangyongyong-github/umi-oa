import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const LevelFilter = ({ reload }) => {
  const [form] = Form.useForm();
  const [queryData, setQueryData] = useState({
    levelName: null,
    levelDescription: null,
  });

  const { isClearForm } = useSelector((state) => state.common);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isClearForm) {
      form.resetFields();
      reload();
      setQueryData({
        levelName: null,
        levelDescription: null,
      });
      dispatch({ type: 'common/clearForm', payload: { isClearForm: false } });
    }
  }, [isClearForm]);

  const searchVal = (type) => {
    const tempData = JSON.parse(JSON.stringify(queryData));
    tempData[type] = form.getFieldValue(type);
    setQueryData(tempData);

    Object.keys(tempData).forEach((key) => {
      !tempData[key] && delete tempData[key];
    });
    reload(tempData);
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="名称" name="levelName">
        <Input onPressEnter={() => searchVal('levelName')} />
      </Form.Item>
      <Form.Item label="描述" name="levelDescription">
        <Input onPressEnter={() => searchVal('levelDescription')} />
      </Form.Item>
    </Form>
  );
};

export default LevelFilter;

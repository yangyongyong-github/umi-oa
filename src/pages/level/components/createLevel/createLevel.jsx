import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import $http from 'api';
import levelList from 'staticList/levelList';
import { levelRule } from 'utils/rules';

const CreateLevel = ({ reloadPage, setDialogStatus }) => {
  const [form] = Form.useForm();

  //- 新增之际表单提交
  const _onFinish = async (values) => {
    let { msg, data } = await $http.createLevel(values);
    if (data) return message.error(msg);
    message.success(msg);
    reloadPage();
    setDialogStatus(false);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={_onFinish}>
      {levelList.map((item, index) => {
        return (
          <Row key={index} justify={'space-between'}>
            {item.map((formItem, innerIndex) => {
              return (
                <Col span={11} key={innerIndex}>
                  <Form.Item
                    style={formItem.style}
                    label={formItem.labelTxt}
                    name={formItem.itemName}
                    required
                    rules={levelRule[formItem.itemName]}
                  >
                    <Input placeholder={formItem.initVal} />
                  </Form.Item>
                </Col>
              );
            })}
          </Row>
        );
      })}
      <Col span={24} style={{ textAlign: 'right' }}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default CreateLevel;

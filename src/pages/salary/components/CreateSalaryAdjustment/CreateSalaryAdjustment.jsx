import React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  message,
} from 'antd';
import $http from 'api';
import salaryList from 'staticList/salary';
import { salaryRule } from 'utils/rules';
import DropPopover from 'components/DropPopover';
import { mapData } from 'utils/mapData';

const { Option } = Select;

const CreateSalaryAdjustment = ({ setDialogStatus, reloadPage }) => {
  const [form] = Form.useForm();

  const _onFinish = async (values) => {
    delete values.staffNameVal;
    let { code, msg } = await $http.createSalaryAdjustment(values);
    if (!code) {
      message.success(msg);
      reloadPage();
      setDialogStatus(false);
    }
  };

  //- 表单集合映射
  const groupData = {
    input: (item) => <Input placeholder={item.initVal} />,
    select: (item) => {
      return (
        <Select placeholder={item.initVal}>
          {mapData[item.itemName].map((val, index) => (
            <Option key={index} value={index}>
              {val}{' '}
            </Option>
          ))}
        </Select>
      );
    },
    popover: (item) => {
      return (
        <Input
          readOnly
          placeholder={item.initVal}
          addonAfter={
            <>
              <DropPopover
                placeholderVal={item.labelTxt}
                interfaceName={item.url}
                searchType={item.type}
                getSelectItem={(obj) => {
                  form.setFieldsValue({
                    [item.itemName]: obj[item.type],
                    [item.itemName.split('V')[0]]: obj._id,
                  });
                }}
              />
            </>
          }
        />
      );
    },
    date: (item) => (
      <DatePicker placeholder="请选择开始时间" style={{ width: '100%' }} />
    ),
  };

  return (
    <Form form={form} layout="vertical" onFinish={_onFinish}>
      {salaryList.map((item, index) => {
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
                    rules={salaryRule[formItem.itemName]}
                  >
                    {formItem.renderType &&
                      groupData[formItem.renderType](formItem)}
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

export default CreateSalaryAdjustment;

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
import rewardList from 'staticList/rewardList';
import { rewardRule } from 'utils/rules';
import DropPopover from 'components/DropPopover';
import Upload from 'components/Upload';
const { Option } = Select;
import { mapData } from 'utils/mapData';

const AddFom = ({ setDialogStatus, reloadPage }) => {
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
    select: (item) => (
      <Select placeholder={item.initVal}>
        {mapData[item.itemName].map((val, index) => (
          <Option key={index} value={index}>
            {val}
          </Option>
        ))}
      </Select>
    ),
    popover: (item) => {
      return (
        <Input
          readOnly
          placeholder={item.initVal}
          addonAfter={
            <DropPopover
              placeholderVal="请输入搜索的员工"
              interfaceName={item.url}
              searchType={item.type}
              getSelectItem={(obj) => {
                form.setFieldsValue({
                  [item.itemName]: obj[item.type],
                  staffId: obj._id,
                });
              }}
            />
          }
        />
      );
    },
    date: (item) => (
      <DatePicker placeholder="请选择入职时间" style={{ width: '100%' }} />
    ),
    //- 上传附件图片
    upload: (item) => (
      <Upload getNewAvatar={(file) => form.setFieldsValue({ file })} />
    ),
  };
  return (
    <Form form={form} layout="vertical" onFinish={_onFinish}>
      {rewardList.map((item, index) => {
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
                    rules={rewardRule[formItem.itemName]}
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

export default AddFom;

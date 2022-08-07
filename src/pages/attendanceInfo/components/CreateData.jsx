import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker, message, Select } from 'antd';
import $http from 'api';
import DropPopover from 'components/DropPopover';
import addendanceList from 'staticList/addendanceList';
import { attendanceRule } from 'utils/rules';
const { Option } = Select;
import { mapData } from 'utils/mapData';

const CreateData = ({ setDialogStatus, reloadPage }) => {
  const [form] = Form.useForm();

  const _onFinish = async (data) => {
    const staffName = form.getFieldValue('staffName')
    delete data.staffNameVal;
    let { code, msg } = await $http.createAttendance({ staffName, ...data });
    if (!code) {
      message.success(msg);
      reloadPage();
      setDialogStatus(false);
    }
  };

  //- 表单集合映射
  const groupData = {
    select: item => (
      <Select placeholder={item.initVal}>
        {mapData[item.itemName].map((val, index) => <Option key={index} value={(index)}>{val} </Option>)}
      </Select>
    ),
    popover: item => {
      return <Input readOnly placeholder={item.initVal} addonAfter={
        <>
          <DropPopover
            placeholderVal={item.labelTxt}
            interfaceName='getStaffList'
            searchType='userName'
            getSelectItem={(obj) => {
              form.setFieldsValue({ staffNameVal: obj.userName, staffName: obj._id })
            }}
          />
        </>
      } />
    },
    date: item => (<DatePicker placeholder="请选择考勤时间" style={{ width: '100%' }} />),
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={_onFinish}>
      {
        addendanceList.map((item, index) => {
          return (
            <Row key={index} justify={'space-between'}>
              {
                item.map((formItem, innerIndex) => {
                  return (
                    <Col span={11} key={innerIndex}>
                      <Form.Item style={formItem.style} label={formItem.labelTxt} name={formItem.itemName} required rules={attendanceRule[formItem.itemName]}>
                        {
                          formItem.renderType && groupData[formItem.renderType](formItem)
                        }
                      </Form.Item>
                    </Col>
                  )
                })
              }
            </Row>
          )
        })
      }
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

export default CreateData;

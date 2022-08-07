import React from 'react';
import { Form, Input, Row, Col, DatePicker, Select, message } from 'antd';
import $http from 'api';
import { useDispatch, useSelector } from 'react-redux';
import salaryList from 'staticList/salary';
import { salaryRule } from 'utils/rules';
import moment from 'moment';
import { mapData } from 'utils/mapData';
const { Option } = Select;

const SalaryDetailComponent = ({ _initSalaryList }) => {
  const { salaryDetail } = useSelector((state) => state.salary);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //- 上传时检测
  const checkForm = async (item) => {
    const editData = await form.validateFields([item.itemName]);
    if (editData[item.itemName] == salaryDetail[item.itemName]) return;
    updateSalaryInfo(item, editData);
  };

  //- 修改
  const updateSalaryInfo = async (item, editData) => {
    const { code, msg } = await $http.updateSalaryDetail({
      _id: salaryDetail._id,
      type: item.itemName,
      updateVal: editData[item.itemName],
    });
    if (code) return;
    message.success(msg);
    _initSalaryList();
    dispatch({
      type: 'salary/_getSalaryDetail',
      payload: { _id: salaryDetail._id },
    });
  };

  //- 表单集合映射
  const groupData = {
    input: (item) => (
      <Input placeholder={item.initVal} onBlur={() => checkForm(item)} />
    ),
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
      return <Input disabled placeholder={item.initVal} />;
    },
    date: (item) => (
      <DatePicker
        placeholder="请选择入职时间"
        style={{ width: '100%' }}
        onBlur={() => checkForm(item)}
      />
    ),
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...salaryDetail,
        staffNameVal: salaryDetail?.staffName?.userName,
        startTime: moment(salaryDetail?.startTime),
      }}
    >
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
    </Form>
  );
};

export default SalaryDetailComponent;

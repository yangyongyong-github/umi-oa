// @ts-nocheck
import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, message } from 'antd';
import formList from 'staticList/staffList';
import DropPopover from 'components/DropPopover';
import moment from 'moment';
import { staffRule } from 'utils/rules';
import $http from 'api';
import { useDispatch } from 'umi';
import Upload from 'components/Upload';

const { Option } = Select;

const DetailForm = ({ staffDetail, _initStaffList }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //- 提交表单之前的验证
  const beforeChecked = async (item) => {
    const newVal = form.getFieldValue(item.itemName);
    let oldVal = staffDetail[item.itemName];
    if (typeof oldVal === 'object') {
      oldVal = oldVal._id;
    }

    try {
      //- 判断新旧值是否相同
      if (newVal === oldVal) return false;

      //- 账户名或者是手机号码进行验证
      if (item.itemName === 'accountName' || item.itemName === 'mobile') {
        const reqData = await form.validateFields([item.itemName]);
        const { data, msg } = await $http.checkIsExists({ checkData: reqData });
        if (data) {
          form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] });
          return message.error(msg);
        }
      }

      _updateStaff(item.itemName, newVal);
    } catch (error) {
      form.setFieldsValue({ [item.itemName]: staffDetail[item.itemName] });
    }
  };

  //- 修改标单项
  const _updateStaff = async (type, updateVal) => {
    const { code, msg } = await $http.updateStaff({
      _id: staffDetail._id,
      type,
      updateVal,
    });
    if (code) return;
    message.success(msg);
    _initStaffList();
    dispatch({
      type: 'staff/_getStaffDetail',
      payload: { _id: staffDetail._id },
    });
  };

  const formData = {
    input: (item) => (
      <Input
        placeholder={
          item.itemName === 'password'
            ? '请在登录界面完成修改'
            : item.placeholderVal
        }
        disabled={item.itemName === 'password'}
        onBlur={() => beforeChecked(item)}
      />
    ),
    select: (item) => (
      <Select
        placeholder={item.placeholderVal}
        onChange={() => beforeChecked(item)}
      >
        {item.optionData.map((val, index) => {
          return (
            <Option key={index} value={index}>
              {val}
            </Option>
          );
        })}
      </Select>
    ),
    date: (item) => (
      <DatePicker
        style={{ width: '100%' }}
        placeholder={item.placeholderVal}
        onChange={() => beforeChecked(item)}
      />
    ),
    popover: (item) => (
      <Input
        placeholder={item.placeholderVal}
        readOnly
        addonAfter={
          <DropPopover
            placeholderVal={item.placeholderVal}
            interfaceName={item.interfaceName}
            searchType={item.itemName}
            getSelectItem={(res) => {
              form.setFieldsValue({
                [item.itemName]: res[item.itemName],
                [item.itemName.split('N')[0]]: res._id,
              });
              const reqData = JSON.parse(JSON.stringify(item));
              reqData.itemName = reqData.itemName.split('N')[0];
              beforeChecked(reqData);
            }}
          />
        }
      />
    ),
    upload: (item) => (
      <Upload
        avatar={staffDetail.avatar}
        getNewAvatar={(newAvatar) => {
          _updateStaff('avatar', newAvatar);
        }}
      />
    ),
  };

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        ...staffDetail,
        onboardingTime: moment(staffDetail.onboardingTime),
        departmentName: staffDetail.department?.departmentName,
        levelName: staffDetail.level?.levelName,
      }}
    >
      {formList.map((arr, index) => {
        return (
          <Row key={index} justify={'space-between'}>
            {arr.map((item, childIndex) => {
              return (
                <Col span="11" key={childIndex}>
                  <Form.Item
                    style={{ ...item.style }}
                    name={item.itemName}
                    label={item.labelTxt}
                    rules={staffRule[item.itemName]}
                  >
                    {formData[item.renderType](item)}
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

export default DetailForm;

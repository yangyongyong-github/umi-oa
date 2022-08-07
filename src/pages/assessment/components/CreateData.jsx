import React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  message,
  InputNumber,
} from 'antd';
import $http from 'api';
import DropPopover from 'components/DropPopover';
import assessmentList from 'staticList/assessmentList';
import { assessmentRule } from 'utils/rules';

const CreateData = ({ setDialogStatus, reloadPage }) => {
  const [form] = Form.useForm();

  const _onFinish = async (data) => {
    data.standardScore = +data.standardScore;
    data.assessmentScore = +data.assessmentScore;
    delete data.currentLevelVal;
    delete data.staffNameVal;
    data.staffName = form.getFieldValue('staffName');
    data.standardScore = form.getFieldValue('standardScore');
    data.currentLevel = form.getFieldValue('currentLevel');
    let { code, msg } = await $http.createAssessment(data);
    if (!code) {
      message.success(msg);
      reloadPage();
      setDialogStatus(false);
    }
  };

  //- 改变内容时计算评级得分标准
  const valueChange = () => {
    const standardScore = form.getFieldValue('standardScore');
    const assessmentScore = form.getFieldValue('assessmentScore');
    if (standardScore && assessmentScore) {
      const result = assessmentScore - standardScore;
      let levelTag = null;
      switch (true) {
        case result <= 0:
          levelTag = 'C';
          break;
        case result > 0 && result < 20:
          levelTag = 'B';
          break;
        default:
          levelTag = 'A';
          break;
      }
      form.setFieldsValue({ result: levelTag });
    }
  };

  //- 表单集合映射
  const groupData = {
    input: (item) => (
      <Input placeholder={item.initVal} readOnly={item.readOnly} />
    ),
    inputNumber: (item) => (
      <InputNumber
        style={{ width: '100%' }}
        readOnly={item.readOnly}
        placeholder={item.initVal}
      />
    ),
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
                  const setData = {
                    [item.itemName]: obj[item.type],
                    [item.itemName.split('V')[0]]: obj._id,
                  };
                  item.itemName === 'currentLevelVal' &&
                    (setData.standardScore = +obj.levelScore);
                  form.setFieldsValue(setData);
                }}
              />
            </>
          }
        />
      );
    },
    date: () => (
      <DatePicker placeholder="请选择入职时间" style={{ width: '100%' }} />
    ),
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFieldsChange={valueChange}
      onFinish={_onFinish}
    >
      {assessmentList.map((item, index) => {
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
                    rules={assessmentRule[formItem.itemName]}
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

export default CreateData;

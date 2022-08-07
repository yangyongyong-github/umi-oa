import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Tag,
  message,
} from 'antd';
import $http from 'api';
import { useDispatch, useSelector } from 'react-redux';
import assessmentList, { readData } from 'staticList/assessmentList';
import { assessmentRule } from 'utils/rules';
import moment from 'moment';
import { formatDate } from 'utils/format';
import DropPopover from 'components/DropPopover';

const AssessmentDetail = ({ _initAssessmentList }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { assessmentDetail } = useSelector((state) => state.assessment);

  // //- 上传时检测
  const checkForm = async (item) => {
    const editData = await form.validateFields([item.itemName]);
    updateLevelInfo(item, editData);
  };

  // //- 修改
  const updateLevelInfo = async (item, editData) => {
    const { code, msg } = await $http.updateAssessmentDetail({
      _id: assessmentDetail._id,
      type: item.itemName,
      updateVal: editData[item.itemName],
    });
    if (code) return;
    message.success(msg);
    _initAssessmentList();
    dispatch({
      type: 'assessment/_initAssessmentList',
      payload: { _id: assessmentDetail._id },
    });
  };

  //- 表单集合映射
  const groupData = {
    input: (item) => (
      <Input placeholder={item.initVal} onBlur={() => checkForm(item)} />
    ),
    inputNumber: (item) => (
      <InputNumber
        placeholder={item.initVal}
        readOnly={item.readOnly}
        onBlur={() => checkForm(item)}
      />
    ),
    popover: (item) => {
      return item.itemName === 'staffNameVal' ? (
        <Tag>{assessmentDetail.staffName.userName}</Tag>
      ) : (
        <Input
          readOnly
          className="border-color"
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
                    (setData.standardScore = obj.levelScore);
                  form.setFieldsValue(setData);
                  updateLevelInfo(
                    { itemName: 'currentLevel' },
                    { currentLevel: obj._id },
                  );
                }}
              />
            </>
          }
        />
      );
    },
    date: (item) => (
      <DatePicker
        placeholder="请选择入职时间"
        style={{ width: '100%' }}
        onBlur={() => checkUserName(item)}
      />
    ),
    tag: (item) => (
      <Tag>
        {item.itemName === 'departmentName'
          ? assessmentDetail.staffName?.department?.departmentName || '--'
          : formatDate(assessmentDetail.staffName?.onboardingTime)}
      </Tag>
    ),
  };

  return (
    <Form
      form={form}
      form={form}
      layout="vertical"
      initialValues={{
        ...assessmentDetail,
        date: moment(assessmentDetail.date),
        currentLevelVal: assessmentDetail?.currentLevel?.levelName,
      }}
    >
      {[...assessmentList, ...readData].map((item, index) => {
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
    </Form>
  );
};

export default AssessmentDetail;

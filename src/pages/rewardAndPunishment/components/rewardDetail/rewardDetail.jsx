import React from 'react';
import { Form, Input, Row, Col, DatePicker, Select, message } from 'antd';
import $http from 'api';
import { useDispatch, useSelector } from 'react-redux';
import rewardList from 'staticList/rewardList';
import Upload from 'components/Upload';
import { rewardRule } from 'utils/rules';
import { mapData } from 'utils/mapData';
const { Option } = Select;
import moment from 'moment';

const RewardDetail = ({ _initReward }) => {
  const { rewardDetail } = useSelector((state) => state.reward);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //- 上传时检测
  const checkForm = async (item) => {
    const editData = await form.validateFields([item.itemName]);
    if (editData[item.itemName] == rewardDetail[item.itemName]) return;
    updateRewardInfo(item, editData);
  };

  //- 修改
  const updateRewardInfo = async (item, editData) => {
    const { code, msg } = await $http.updateReward({
      _id: rewardDetail._id,
      type: item.itemName,
      updateVal: editData[item.itemName],
    });
    if (code) return;
    message.success(msg);
    _initReward();
    dispatch({
      type: 'reward/_getRewardDetail',
      payload: { _id: rewardDetail._id },
    });
  };

  //- 表单集合映射
  const groupData = {
    input: (item) => (
      <Input placeholder={item.initVal} onBlur={() => checkForm(item)} />
    ),
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
      return <Input disabled placeholder={item.initVal} />;
    },
    date: (item) => (
      <DatePicker
        placeholder="请选择入职时间"
        style={{ width: '100%' }}
        onBlur={() => checkForm(item)}
      />
    ),
    //- 上传附件图片
    upload: (item) => (
      <Upload
        getNewAvatar={(file) =>
          updateRewardInfo({ itemName: 'avatar' }, { avatar })
        }
        url={rewardDetail.file}
      />
    ),
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...rewardDetail,
        staffName: rewardDetail.staffName.userName,
        date: moment(rewardDetail.date),
      }}
    >
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
    </Form>
  );
};

export default RewardDetail;

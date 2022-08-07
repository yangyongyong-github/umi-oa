import React from 'react';
import { Form, Input, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import levelList from 'staticList/levelList';
import { levelRule } from 'utils/rules';
import $http from 'api';

const LevelDetail = ({ _initLevelList }) => {
  const { levelDetail } = useSelector((state) => state.level);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //- 上传时检测
  const checkForm = async (item) => {
    const editData = await form.validateFields([item.itemName]);
    if (editData[item.itemName] == levelDetail[item.itemName]) return;
    updateLevelInfo(item, editData);
  };

  //- 修改
  const updateLevelInfo = async (item, editData) => {
    const { code, msg } = await $http.updateLevelDetail({
      _id: levelDetail._id,
      type: item.itemName,
      updateVal: editData[item.itemName],
    });
    if (code) return;
    message.success(msg);
    _initLevelList();
    dispatch({
      type: 'level/_getLevelDetail',
      payload: { _id: levelDetail._id },
    });
  };

  return (
    <Form form={form} layout="vertical" initialValues={levelDetail}>
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
                    <Input
                      placeholder={formItem.initVal}
                      onBlur={() => checkForm(formItem)}
                    />
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

export default LevelDetail;

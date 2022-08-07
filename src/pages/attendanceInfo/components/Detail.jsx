import React from 'react';
import { Form, Input, Row, Col, DatePicker, Select, message } from 'antd';
import $http from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { attendanceRule } from 'utils/rules';
import moment from 'moment';
import { mapData } from 'utils/mapData';

const AttendanceDetail = ({ _initAttendanceList }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { attendanceDetail } = useSelector((state) => state.attendanceInfo);

  //- 修改
  const updateVal = async (type) => {
    const updateVal = form.getFieldValue(type)
    const { code, msg } = await $http.updateAttendance({ _id: attendanceDetail._id, type, updateVal });
    if (code) return
    message.success(msg);
    _initAttendanceList();
    dispatch({ type: 'attendanceInfo/getAttendanceDetail', payload: { _id: attendanceDetail._id } })
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        {
          attendanceType: attendanceDetail?.attendanceType,
          createTime: moment(attendanceDetail?.createTime),
          staffName: attendanceDetail?.staffName.userName
        }
      }
    >
      {
        <Row justify={'space-between'}>
          <Col span={11} >
            <Form.Item
              label='员工姓名'
              name='staffName'
              required
              rules={attendanceRule['staffName']}
            >
              <Input readOnly className="border-color" />
            </Form.Item>
          </Col>
          <Col span={11} >
            <Form.Item
              label='考勤类型'
              name='attendanceType'
              required
              rules={attendanceRule['attendanceType']}
            >
              <Select placeholder="请输入考勤类型" onChange={() => updateVal('attendanceType')}>
                {mapData['attendanceType'].map((val, index) => (
                  <Select.Option key={index} value={index}>
                    {val}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={11} >
            <Form.Item
              label='	考勤时间'
              name='createTime'
              required
              rules={attendanceRule['createTime']}
            >
              <DatePicker placeholder="请选择考勤填写时间" style={{ width: '100%' }} onChange={() => updateVal('createTime')} />
            </Form.Item>
          </Col>
        </Row>
      }
    </Form>
  );
};

export default AttendanceDetail;

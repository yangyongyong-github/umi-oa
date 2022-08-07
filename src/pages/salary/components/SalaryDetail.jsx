import React, { useState, useEffect } from 'react';
import '../../staff/css/StaffDetailDialog.less';
import iconMap from 'utils/iconMap';
import { Form, Input, message, DatePicker, Select } from 'antd';
import $http from 'api';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from 'utils/format';
import moment from 'moment';
import dataMap from '../../../utils/dataMap';
const { Option } = Select;

const SalaryDetail = ({ isShowDetail, setIsShowDetail }) => {
  const dispatch = useDispatch();
  const salaryDetail = useSelector((state) => state.salary.salaryDetail);
  const [form] = Form.useForm();
  const closeClick = () => {
    setIsShowDetail(false);
  };

  //- 修改
  const updateLevelDetail = async (value) => {
    // let { code, msg } = await $http.updateAssessmentDetail({
    //   _id: salaryDetail._id,
    //   type: value.target.id,
    //   updateVal: value.target.value,
    //   staffName: salaryDetail.staffName._id,
    // });
    // if (!code) {
    //   message.success(msg);
    //   dispatch({
    //     type: 'assessment/initAssessmentList',
    //     payload: { size: 10 },
    //   });
    // }
  };

  //- 删除
  const deleteLevel = async (id) => {
    // let { code, msg } = await $http.deleteLevel([id]);
    // if (!code) {
    //   message.success('删除成功');
    //   dispatch({ type: 'level/initLevelList', payload: { size: 10 } });
    //   setIsShowDetail(false);
    // }
  };

  return (
    <>
      {isShowDetail && salaryDetail && (
        <div className="detail-dialog">
          <div className="detail-dialog-header">
            <div className="staff-detail-user-name">
              <span className="icon">{iconMap.copy}</span>
              <span className="user-name">
                {salaryDetail.staffName.userName}
              </span>
            </div>
            <div className="icon-right">
              {/* <span className="icon" onClick={() => deleteLevel(salaryDetail._id)}>{iconMap.delete}</span> */}
              {/* <span className="icon">{iconMap.ellipsis}</span> */}
              <span className="line"></span>
              <span className="icon" onClick={closeClick}>
                {iconMap.close}
              </span>
            </div>
          </div>
          <div className="detail-content">
            <Form form={form} layout="vertical">
              <Form.Item
                label="调薪原因"
                name="reason"
                initialValue={salaryDetail.reason}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                  name="staffName"
                  label="员工"
                >
                  <span style={{ paddingLeft: '10px' }}>
                    {salaryDetail.staffName.userName}
                  </span>
                </Form.Item>
                <Form.Item
                  style={{
                    display: 'inline-flex',
                    width: 'calc(55% - 4px)',
                    marginLeft: '8px',
                  }}
                  name="startTime"
                  label="开始时间"
                  initialValue={moment(salaryDetail?.startTime, 'YYYY-MM-DD')}
                >
                  <DatePicker
                    style={{ minWidth: '150px' }}
                    onBlur={updateLevelDetail}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                  name="salaryType"
                  label="类型"
                  initialValue={dataMap['salaryType'][salaryDetail.salaryType]}
                >
                  <Select>
                    {dataMap['salaryType'] &&
                      Object.keys(dataMap['salaryType']).map((key) => (
                        <Option key={key} value={dataMap['salaryType'][key]}>
                          {dataMap['salaryType'][key]}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-flex', width: 'calc(45% - 4px)' }}
                  name="newSalary"
                  label="调整后薪资"
                  initialValue={salaryDetail.newSalary}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryDetail;

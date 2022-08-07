// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import DropPopover from 'components/DropPopover';
import { useSelector, useDispatch } from 'umi';
import { mapData } from 'utils/mapData';

const { Option } = Select;

const FilterForm = ({ reload }) => {
  const [form] = Form.useForm();
  const {
    userInfo: { identity },
  } = useSelector((state) => state.user);
  const { isClearForm } = useSelector((state) => state.common);
  const [queryData, setQueryData] = useState({
    education: null,
    level: null,
    department: null,
    userName: null,
    marriage: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClearForm) {
      form.resetFields();
      reload({});
      setQueryData({
        education: null,
        level: null,
        department: null,
        userName: null,
        marriage: null,
      });
      dispatch({
        type: 'common/clearForm',
        payload: { isClearForm: false },
      });
    }
  }, [isClearForm]);

  //- 员工搜索
  const searchStaff = (type) => {
    const tempData = JSON.parse(JSON.stringify(queryData));
    if (typeof type === 'object') {
      Object.assign(tempData, type);
    } else {
      tempData[type] = form.getFieldValue(type);
    }
    setQueryData(tempData);
    _filterData(tempData);
  };

  //- 搜索员工
  const _filterData = (currentData) => {
    Object.keys(currentData).forEach((key) => {
      if (!currentData[key]) {
        delete currentData[key];
      }
    });
    reload({ queryData: currentData });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="姓名" name="userName">
        <Input
          allowClear
          onPressEnter={() => searchStaff('userName')}
          placeholder="请输入搜索的员工姓名"
        />
      </Form.Item>
      <Form.Item label="部门" name="department">
        <Input
          readOnly
          placeholder="请输入搜索的员工部门"
          addonAfter={
            <DropPopover
              placeholderVal="请输入搜索的部门"
              interfaceName="getDepartmentList"
              searchType="departmentName"
              getSelectItem={(item) => {
                form.setFieldsValue({
                  department: item.departmentName,
                });
                searchStaff({ department: item._id });
              }}
            />
          }
        />
      </Form.Item>
      <Form.Item label="职级" name="level">
        <Input
          readOnly
          placeholder="请输入搜索的员工职级"
          addonAfter={
            <DropPopover
              placeholderVal="请输入搜索的职级"
              interfaceName="getLevelList"
              searchType="levelName"
              getSelectItem={(item) => {
                form.setFieldsValue({
                  level: item.levelName,
                });
                searchStaff({ level: item._id });
              }}
            />
          }
        />
      </Form.Item>
      {identity === 1 && (
        <>
          <Form.Item label="婚姻状况" name="marriage">
            <Select
              allowClear
              onChange={() => searchStaff('marriage')}
              placeholder="根据婚姻状况进行员工搜索"
            >
              {mapData.marriage.map((val, index) => (
                <Option key={index} value={index}>
                  {val}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="学历" name="education">
            <Select
              allowClear
              onChange={() => searchStaff('education')}
              placeholder="根据学历进行员工搜索"
            >
              {mapData.education.map((val, index) => (
                <Option key={index} value={index}>
                  {val}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}
    </Form>
  );
};

export default FilterForm;

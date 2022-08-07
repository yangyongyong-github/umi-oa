import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
import { mapData } from 'utils/mapData';
import moment from 'moment';

const EditableContext = React.createContext(null);

//- 可编辑的行
export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

//- 可编辑的单元格
export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  rules,
  type,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current && inputRef.current.focus();
    }
  }, [editing]);

  //- 单元格点击的时候进行内容的渲染
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
      onboardingTime: moment(record.onboardingTime), //- 指定的时间字段的渲染操作
      date: moment(record.date), //- 指定的时间字段的渲染操作
      createTime: moment(record.createTime), //- 指定的时间字段的渲染操作
    });
  };

  //- 修改之前的检测
  const _sendBeforeCheck = async () => {
    try {
      const editData = await form.validateFields([dataIndex]);
      setEditing(!editing);
      //- 当前修改后的值是否与之前的值相等
      if (record[dataIndex] === editData[dataIndex]) return;
      handleSave({
        _id: record._id,
        updateVal: editData[dataIndex],
        type: dataIndex,
      });
    } catch (error) {
      setEditing(!editing);
    }
  };

  const editNodeData = {
    inputNode: (
      <Input
        ref={inputRef}
        onPressEnter={_sendBeforeCheck}
        onBlur={_sendBeforeCheck}
      />
    ),
    selectNode: (
      <Select ref={inputRef} onBlur={_sendBeforeCheck}>
        {mapData[dataIndex] &&
          mapData[dataIndex].map((item, index) => {
            return (
              <Option key={index} value={index}>
                {item}
              </Option>
            );
          })}
      </Select>
    ),
    dateNode: (
      <DatePicker
        ref={inputRef}
        onBlur={_sendBeforeCheck}
        onChange={_sendBeforeCheck}
      />
    ),
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item name={dataIndex} rules={rules}>
        {editNodeData[type]}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

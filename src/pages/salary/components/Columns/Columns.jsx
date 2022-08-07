import { formatDate } from 'utils/format';
import { mapData } from 'utils/mapData';
import { salaryRule } from 'utils/rules';
import iconMap from 'components/IconMap';
import { Tag } from 'antd';

const Columns = (handleSave, getSalaryAdjustmentDetail) => {
  let columns = [
    {
      title: '调薪原因',
      dataIndex: 'reason',
      editable: true,
      render: (record, { _id }) => {
        return (
          <div className="staff-wrapper">
            <span className="user-name">{record}</span>
            <span
              className="detail-icon"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                getSalaryAdjustmentDetail(_id);
              }}
            >
              {iconMap.detail}
            </span>
          </div>
        );
      },
    },
    {
      title: '调整后薪资',
      dataIndex: 'newSalary',
      editable: true,
    },
    {
      title: '员工',
      dataIndex: 'staffName',
      editable: false,
      render: (record) => <Tag>{record?.userName}</Tag>,
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      editable: false,
      render: (record) => <span>{record?.department?.departmentName}</span>,
    },
    {
      title: '类型',
      dataIndex: 'salaryType',
      editable: true,
      render: (record) => <Tag>{mapData.salaryType[record]}</Tag>,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      editable: true,
      render: (record) => formatDate(record, 'YYYY-MM-DD'),
    },
  ];

  columns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => {
        let type = '';
        switch (col.dataIndex) {
          case 'startTime':
            type = 'dateNode';
            break;
          case 'salaryType':
            type = 'selectNode';
            break;
          default:
            type = 'inputNode';
            break;
        }
        return {
          record,
          type,
          editable: col.editable,
          dataIndex: col.dataIndex,
          align: 'center',
          title: col.title,
          handleSave,
          width: '20%',
          rules: salaryRule[col.dataIndex],
        };
      },
    };
  });
  return columns;
};

export default Columns;

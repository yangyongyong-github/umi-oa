import iconMap from 'components/IconMap';
import { formatDate } from 'utils/format';
import { Tag } from 'antd';
import { mapData } from 'utils/mapData';
import { attendanceRule } from 'utils/rules';

const Columns = (handleSave, getAssessmentDetail) => {
  let columns = [
    {
      title: '考勤员工',
      dataIndex: 'staffName',
      render: (record, { _id }) => {
        return (
          <div className="staff-wrapper">
            <span className="user-name">{record?.userName}</span>
            <span
              className="detail-icon"
              onClick={(e) => {
                e.stopPropagation();
                getAssessmentDetail(_id)
              }}
            >
              {iconMap.detail}
            </span>
          </div>
        );
      },
    },
    {
      title: '考勤类型',
      dataIndex: 'attendanceType',
      editable: true,
      render: (val) => {
        return <Tag> {mapData.attendanceType[val]}</Tag>
      },
    },
    {
      title: '考勤时间',
      editable: true,
      dataIndex: 'createTime',
      render: (createTime) => {
        return formatDate(createTime, 'YYYY-MM-DD')
      },
    },
  ];

  columns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => {
        let type = '';
        switch (col.dataIndex) {
          case 'createTime':
            type = 'dateNode';
            break;
          case 'attendanceType':
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
          rules: attendanceRule[col.dataIndex]
        };
      },
    };
  });
  return columns
}

export default Columns
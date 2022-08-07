import iconMap from 'components/IconMap';
import { formatDate } from 'utils/format';
import { assessmentRule } from 'utils/rules';

const Columns = (handleSave, getAssessmentDetail) => {
  let columns = [
    {
      title: '员工',
      dataIndex: 'staffName',
      render: (record, { _id }) => {
        return (
          <div className="staff-wrapper">
            <span className="user-name">{record?.userName}</span>
            <span
              className="detail-icon"
              onClick={(e) => {
                e.stopPropagation();
                getAssessmentDetail(_id);
              }}
            >
              {iconMap.detail}
            </span>
          </div>
        );
      },
    },
    {
      title: '部门',
      dataIndex: 'staffName',
      render: (record) => (
        <span>
          {record.department ? record.department?.departmentName : '---'}
        </span>
      ),
    },
    {
      title: '初始职级',
      dataIndex: 'initLevel',
      render: (record) => <span>{record?.levelName}</span>,
    },
    {
      title: '调整职级',
      dataIndex: 'currentLevel',
      render: (record) => <span>{record?.levelName}</span>,
    },
    {
      title: '入职时间',
      dataIndex: 'staffName',
      render: (record) => formatDate(record?.onboardingTime, 'YYYY-MM-DD'),
    },
    { title: '对应分数', dataIndex: 'standardScore', editable: true },
    { title: '考核得分', dataIndex: 'assessmentScore', editable: true },
    { title: '考核等级', dataIndex: 'result', editable: true },
    {
      title: '考核时间',
      dataIndex: 'date',
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
          case 'date':
            type = 'dateNode';
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
          title: col.title,
          handleSave,
          rules: assessmentRule[col.dataIndex],
        };
      },
    };
  });
  return columns;
};

export default Columns;

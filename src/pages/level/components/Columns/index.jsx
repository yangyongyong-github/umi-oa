import iconMap from 'components/IconMap';
import { levelRule } from 'utils/rules';

const Columns = (handleSave, getLevelDetail) => {
  let columns = [
    {
      title: '职级名称',
      dataIndex: 'levelName',
      editable: true,
      render: (record, { _id }) => {
        return (
          <>
            <span className="user-name">{record}</span>
            <span
              className="detail-icon"
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                getLevelDetail(_id);
              }}
            >
              {iconMap.detail}
            </span>
          </>
        );
      },
    },
    { title: '职级描述', dataIndex: 'levelDescription', editable: true },
    {
      title: '考核要求',
      dataIndex: 'assessmentRequire',
      editable: true,
      render: (record) => (record ? record : '暂无考核要求'),
    },
    {
      title: '面试要求',
      dataIndex: 'interviewRequire',
      editable: true,
      sorter: (a, b) => a.interviewRequire - b.interviewRequire,
      render: (record) => (record ? record : '暂无面试要求'),
    },
    {
      title: '分红权配赠基数',
      dataIndex: 'baseNumber',
      editable: true,
      sorter: (a, b) => a.baseNumber - b.baseNumber,
      render: (record) => (record ? record : '暂无分红权配赠基数'),
    },
    {
      title: '职级对应分数',
      dataIndex: 'levelScore',
      editable: true,
      sorter: (a, b) => a.levelScore - b.levelScore,
      render: (record) => (record ? record : '暂无职级对应分数'),
    },
  ];

  columns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          align: 'center',
          title: col.title,
          handleSave,
          type: 'inputNode',
          rules: levelRule[col.dataIndex],
        };
      },
    };
  });
  return columns;
};

export default Columns;

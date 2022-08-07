import iconMap from 'components/IconMap';
import { Tag, Image } from 'antd';
import { formatDate } from 'utils/format';
import { rewardRule } from 'utils/rules';
import loadErrorImg from 'common/img/load_error.png';

const Columns = (handleSave, getSalaryAdjustmentDetail) => {
  let columns = [
    {
      title: '员工',
      dataIndex: 'staffName',
      editable: false,
      render: (record, { _id }) => {
        return (
          <div className="staff-wrapper">
            <span className="user-name">{record?.userName || '---'}</span>
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
      title: '类型',
      dataIndex: 'type',
      render: (record) => {
        const typeList = ['', '优秀员工', '知识创新', '通报批评', '警告处分'];
        return (
          <Tag color={record > 2 ? '#f50' : '#108ee9'}>{typeList[record]}</Tag>
        );
      },
    },
    {
      title: '原因',
      dataIndex: 'reason',
      editable: true,
    },
    {
      title: '详细信息',
      dataIndex: 'recordDesc',
      editable: true,
    },
    {
      title: '记录时间',
      dataIndex: 'date',
      editable: true,
      render: (record) => formatDate(record, 'YYYY-MM-DD'),
    },
    {
      title: '附件',
      dataIndex: 'file',
      render: (img) => (
        <Image width={50} src={img ? img : 'error'} fallback={loadErrorImg} />
      ),
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
          align: 'center',
          title: col.title,
          handleSave,
          width: '20%',
          rules: rewardRule[col.dataIndex],
        };
      },
    };
  });
  return columns;
};

export default Columns;

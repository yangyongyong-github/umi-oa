import React from 'react';
import ReactEChart from 'echarts-for-react';

const AgeColumn = ({ renderList, styleData }) => {
  const option = {
    title: { text: '平均年龄' },
    xAxis: { max: Math.ceil(Math.max(...renderList.map((item) => item.age))) },
    yAxis: {
      type: 'category',
      data: renderList.map((item) => item.name),
      inverse: true,
      max: 1,
    },
    series: [
      {
        realtimeSort: true,
        type: 'bar',
        data: renderList.map((item) => item.age),
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  };

  return (
    <div className="staff-amount-container" style={{ ...styleData }}>
      <ReactEChart className="react_for_echarts" option={option} />
    </div>
  );
};

export default AgeColumn;

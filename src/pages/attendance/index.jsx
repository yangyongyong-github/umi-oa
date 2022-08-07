// @ts-nocheck
import React, { useEffect } from 'react';
import ViolationChart from './component/ViolationChart';
import ViolationTable from './component/ViolationTable';
import { useDispatch, useSelector } from 'umi';
import './css/index.less';

const attendance = () => {
  const dispatch = useDispatch();
  const { tableList, chartList } = useSelector((state) => state.attendance);
  const { userInfo } = useSelector((state) => state.user);

  //- 初始化的数据调用
  useEffect(() => {
    dispatch({ type: 'attendance/initAttendanceList' });
  }, []);

  return (
    <div className="attendance-container">
      {userInfo.identity === 1 && (
        <div className="list-container">
          {chartList.map((item, index) => (
            <ViolationChart {...item} key={index} />
          ))}
        </div>
      )}

      <div
        className="list-container"
        style={{ width: userInfo.identity === 1 ? '49.8%' : '100%' }}
      >
        {tableList.map((item, index) => (
          <ViolationTable {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default attendance;

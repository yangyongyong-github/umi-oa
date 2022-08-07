import React, { useEffect } from 'react';
import StaffAmount from './component/StaffAmount';
import OldStaffTable from './component/OldStaffTable';
import Pie from './component/Pie';
import AgeColumn from './component/AgeColumn';
import Column from './component/Column';
import { useSelector, useDispatch } from 'umi';
import './css/index.less';

const index = () => {
  const {
    amountDataList,
    pieList,
    columnList,
    marriageData,
    staffData,
    constellationData,
  } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'dashboard/initDashboardList' });
  }, []);

  return (
    <div className="dashboard-container">
      {/* 员工展示组件 执行四次 */}
      {amountDataList.map((item, index) => (
        <StaffAmount key={index} {...item} />
      ))}

      {/* 饼状图处理 学历情况，员工性别 */}
      {pieList.map((item, index) => (
        <Pie {...item} key={index} />
      ))}

      {/* 年龄柱状图 */}
      {pieList[1] && <AgeColumn {...pieList[1]} />}

      {/* 员工婚姻状况 */}
      <Pie {...marriageData} />

      {columnList.map((item, index) => (
        <Column key={index} {...item} />
      ))}

      {/* 最老的十个员工 */}
      <OldStaffTable {...staffData} />

      {/* 星座分布 */}
      <Pie {...constellationData} />
    </div>
  );
};

export default index;

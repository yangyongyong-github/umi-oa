// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import SearchContainer from '../../components/SearchContainer';
import TableHeader from '../../components/TableHeader';
import FilterForm from './component/FilterForm';
import TableList from './component/TableList';
import DrawerComponent from 'components/Drawer';
import DetailForm from './component/DetailForm';
import useCommon from '../../hook/useCommon';
import Dialog from 'components/Dialog';
import AddForm from './component/AddForm';

const staff = () => {
  const dispatch = useDispatch();
  const { staffTotal, staffList, staffDetail } = useSelector(
    (state) => state.staff,
  );
  const { userInfo } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [page, setPage] = useCommon();

  useEffect(() => {
    _initStaffList();
  }, []);

  const _initStaffList = (data) =>
    dispatch({
      type: 'staff/_initStaffList',
      payload: { size: 3, page: page.current, ...data }, //-{department:'',userName:''}
    });

  //- 改变当前展示列表的页数
  const changeCurrentPage = (currentPage) => {
    //- currentPage => 获取到的最新的页数
    setPage(currentPage);
    _initStaffList();
  };

  //- 根据搜索条件进行列表展示
  const getQueryData = (queryData) => {
    _initStaffList(queryData);
  };

  return (
    <div className="main-content">
      {/* 公共的表格头部组件 */}
      <TableHeader
        page={page.current}
        total={staffTotal}
        size={3}
        changeCurrentPage={changeCurrentPage}
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteStaffs'}
      />
      {/* 左侧搜索区域 */}
      <SearchContainer
        render={() => (
          <FilterForm reload={(data) => setPage(1) && getQueryData(data)} />
        )}
      />
      {/* 用户列表组件 */}
      <TableList
        userInfo={userInfo}
        staffList={staffList}
        loading={loading}
        reloadPage={_initStaffList}
      />
      {/* 新增员工组件 */}
      <Dialog
        title="新增员工"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={800}
        render={() => (
          <AddForm
            setDialogStatus={setDialogStatus}
            reloadList={() => setPage(1) && _initStaffList()}
          />
        )}
      />
      {/* 使用抽屉组建展示详情信息 */}
      <DrawerComponent
        title={staffDetail?.userName}
        _id={staffDetail?._id}
        interfaceName="deleteStaffs"
        reloadList={() => setPage(1) && _initStaffList()}
        render={() => (
          <DetailForm
            staffDetail={staffDetail}
            _initStaffList={_initStaffList}
          />
        )}
      />
    </div>
  );
};

export default staff;

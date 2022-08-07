import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from 'components/TableHeader';
import Dialog from 'components/Dialog';
import SearchContainer from 'components/SearchContainer';
import CreateData from './components/CreateData';
import FilterForm from './components/FilterForm';
import Detail from './components/Detail';
import Table from './components/Table';
import useCommon from '../../hook/useCommon';
import DrawerComponent from 'components/Drawer';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false)
  const [page, setPage] = useCommon();
  const { attendanceList, total, attendanceDetail } = useSelector((state) => state.attendanceInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    _initAttendanceList();
  }, []);

  const _initAttendanceList = (queryData = {}) => {
    dispatch({
      type: 'attendanceInfo/_initAttendanceList',
      payload: { page: page.current, queryData, size: 5 }
    })
  }

  return (
    <div className="main-content">
      <TableHeader
        page={page.current}
        size={5}
        total={total}
        interfaceDelMethod={'deleteAttendance'}
        openAddDialog={() => setDialogStatus(true)}
        changeCurrentPage={currentPage => setPage(currentPage) && _initAttendanceList()}
      />
      <SearchContainer
        render={() => <FilterForm reload={(data) => setPage(1) && _initAttendanceList(data)} />}
      />
      <Table
        attendanceList={attendanceList}
        reloadPage={() => _initAttendanceList()}
      />
      <Dialog
        title="新增考勤记录"
        width={850}
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        render={() => <CreateData setDialogStatus={setDialogStatus} reloadPage={() => setPage(1) && _initAttendanceList()} />}
      />
      <DrawerComponent
        title={attendanceDetail?.staffName.userName}
        _id={attendanceDetail?._id}
        interfaceName="deleteAttendance"
        reloadList={() => setPage(1) && _initAttendanceList()}
        render={() => <Detail _initAttendanceList={_initAttendanceList} />}
      />
    </div>
  );
};

export default index;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import FilterForm from './components/FilterForm';
import SalaryTable from './components/SalaryTable/SalaryTable.jsx';
import CreateSalaryAdjustment from './components/CreateSalaryAdjustment/CreateSalaryAdjustment';
import Dialog from 'components/Dialog';
import DrawerComponent from 'components/Drawer';
import SalaryDetail from './components/SalaryDetail/SalaryDetail';
import useCommon from '../../hook/useCommon';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const { salaryList, salaryTotal, salaryDetail } = useSelector(
    (state) => state.salary,
  );
  const [page, setPage] = useCommon();
  const dispatch = useDispatch();

  useEffect(() => {
    _initSalaryList();
  }, []);

  const _initSalaryList = (data = {}) => {
    dispatch({
      type: 'salary/_initSalaryList',
      payload: { page: page.current, ...data, size: 10 },
    });
  };

  //- 获取当前搜索的内容
  const getQueryData = (data) => {
    _initSalaryList(data);
  };

  return (
    <div className="main-content">
      <TableHeader
        page={page.current}
        total={salaryTotal}
        size={10}
        changeCurrentPage={(currentPage) =>
          setPage(currentPage) && _initSalaryList()
        }
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteSalary'}
      />
      <SearchContainer
        render={() => (
          <FilterForm reload={(data) => setPage(1) && getQueryData(data)} />
        )}
      />
      <SalaryTable
        salaryList={salaryList}
        reloadPage={() => _initSalaryList()}
      />
      <Dialog
        title="新增调薪记录"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={850}
        render={() => (
          <CreateSalaryAdjustment
            setDialogStatus={setDialogStatus}
            reloadPage={() => setPage(1) && _initSalaryList()}
          />
        )}
      />

      <DrawerComponent
        title={salaryDetail?.staffName?.userName}
        _id={salaryDetail?._id}
        interfaceName="deleteSalary"
        reloadList={() => setPage(1) && _initStaffList()}
        render={() => <SalaryDetail _initSalaryList={_initSalaryList} />}
      />
    </div>
  );
};

export default index;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from 'components/TableHeader';
import useCommon from '../../hook/useCommon';
import SearchContainer from 'components/SearchContainer';
import Dialog from 'components/Dialog';
import DrawerComponent from 'components/Drawer';
import CreateData from './components/CreateData';
import FilterForm from './components/FilterForm';
import Table from './components/Table';
import Detail from './components/Detail';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const { assessmentList, total, assessmentDetail } = useSelector(
    (state) => state.assessment,
  );
  const dispatch = useDispatch();
  const [page, setPage] = useCommon();

  useEffect(() => {
    _initAssessmentList();
  }, []);

  const _initAssessmentList = (data = {}) => {
    dispatch({
      type: 'assessment/_initAssessmentList',
      payload: { page: page.current, queryData: data, size: 5 },
    });
  };

  return (
    <div className="main-content">
      <TableHeader
        page={page.current}
        size={5}
        total={total}
        changeCurrentPage={(currentPage) =>
          setPage(currentPage) && _initAssessmentList()
        }
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteAssessment'}
      />

      <SearchContainer
        render={() => (
          <FilterForm
            reload={(data) => setPage(1) && _initAssessmentList(data)}
          />
        )}
      />

      <Table
        assessmentList={assessmentList}
        reloadPage={() => _initAssessmentList()}
      />

      <Dialog
        title="新增绩效考核"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={850}
        render={() => (
          <CreateData
            setDialogStatus={setDialogStatus}
            reloadPage={() => setPage(1) && _initAssessmentList()}
          />
        )}
      />

      <DrawerComponent
        title={assessmentDetail?.staffName.userName}
        _id={assessmentDetail?._id}
        interfaceName="deleteAssessment"
        reloadList={() => setPage(1) && _initAssessmentList()}
        render={() => <Detail _initAssessmentList={_initAssessmentList} />}
      />
    </div>
  );
};

export default index;

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import FilterForm from './components/FilterForm/FilterForm';
import MainTable from './components/MainTable/MainTable.jsx';
import Dialog from 'components/Dialog';
import DrawerComponent from 'components/Drawer';
import AddForm from './components/AddForm/AddForm';
import RewardDetail from './components/RewardDetail/RewardDetail';
import useCommon from '../../hook/useCommon';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const { rewardList, total, rewardDetail } = useSelector(
    (state) => state.reward,
  );
  const dispatch = useDispatch();
  const [page, setPage] = useCommon();

  useEffect(() => {
    _initReward();
  }, []);

  const _initReward = (data = {}) =>
    dispatch({
      type: 'reward/_initReward',
      payload: { page: page.current, queryData: data, size: 10 },
    });

  return (
    <div className="main-content">
      <TableHeader
        page={page.current}
        total={total}
        size={10}
        changeCurrentPage={(currentPage) =>
          setPage(currentPage) && _initReward()
        }
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteReward'}
      />

      <SearchContainer
        render={() => (
          <FilterForm reload={(data) => setPage(1) && _initReward(data)} />
        )}
      />
      <MainTable rewardList={rewardList} reloadPage={() => _initReward()} />

      <Dialog
        title="创建奖惩记录"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={850}
        render={() => (
          <AddForm
            setDialogStatus={setDialogStatus}
            reloadPage={() => setPage(1) && _initReward()}
          />
        )}
      />
      <DrawerComponent
        title={rewardDetail?.staffName.userName}
        _id={rewardDetail?._id}
        interfaceName="deleteReward"
        reloadList={() => setPage(1) && _initStaffList()}
        render={() => <RewardDetail _initReward={_initReward} />}
      />
    </div>
  );
};

export default index;

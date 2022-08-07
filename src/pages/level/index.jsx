import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import Dialog from 'components/Dialog';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import DrawerComponent from 'components/Drawer';
import useCommon from '../../hook/useCommon';

import CreateLevel from './components/CreateLevel/CreateLevel';
import FilterForm from './components/FilterForm';
import LevelTable from './components/LevelTable';
import LevelDetail from './components/LevelDetail/LevelDetail';

const index = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const { levelList, total, levelDetail } = useSelector((state) => state.level);
  const dispatch = useDispatch();
  const [page, setPage] = useCommon(); //- useRef 可以获取dom对象，获取我们缓存的内容

  useEffect(() => {
    _initLevelList();
  }, []);

  //- 初始化进行职级数据获取
  const _initLevelList = (data = {}) =>
    dispatch({
      type: 'level/_initLevelList',
      payload: { page: page.current, queryData: data, size: 10 },
    });

  return (
    <div className="main-content">
      <TableHeader
        page={page.current}
        size={10}
        total={total}
        changeCurrentPage={(currentPage) =>
          setPage(currentPage) && _initLevelList()
        }
        openAddDialog={() => setDialogStatus(true)}
        interfaceDelMethod={'deleteLevel'}
      />
      <SearchContainer
        render={() => (
          <FilterForm reload={(data) => setPage(1) && _initLevelList(data)} />
        )}
      />
      <LevelTable levelList={levelList} reloadPage={() => _initLevelList()} />
      <Dialog
        title="新增职级"
        dialogStatus={dialogStatus}
        setDialogStatus={setDialogStatus}
        width={850}
        render={() => (
          <CreateLevel
            setDialogStatus={setDialogStatus}
            reloadPage={() => setPage(1) && _initLevelList()}
          />
        )}
      />
      <DrawerComponent
        title={levelDetail?.levelName}
        _id={levelDetail?._id}
        interfaceName="deleteLevel"
        reloadList={() => setPage(1) && _initLevelList()}
        render={() => <LevelDetail _initLevelList={_initLevelList} />}
      ></DrawerComponent>
    </div>
  );
};

export default index;

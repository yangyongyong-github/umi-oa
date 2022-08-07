import React, { useState, useEffect } from 'react';
import { Popover, Input, List, Pagination } from 'antd';
import './index.less';
import useCommon from 'hook/useCommon';
import $http from 'api';
const { Search } = Input;

/*/
 * getSelectItem 函数类型
 */

const DropPopover = ({
  placeholderVal,
  interfaceName,
  searchType,
  getSelectItem,
}) => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useCommon(0);
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);


  //- 页数改变
  const changePage = (currentPage) => {
    setPage(currentPage);
    _initList();
  };

  useEffect(() => {
    _initList();
  }, []);

  //- 创建获取列表请求
  const _initList = async (queryData = {}) => {
    const { data } = await $http[interfaceName]({
      page: page.current,
      size: 5,
      queryData,
    });
    setTotal(data.total || data.staffTotal);
    setList(data.list || data.staffList);
  };

  //- 创建搜索函数
  const onSearch = (val) => {
    const searchData = !val ? {} : { [searchType]: val };
    setPage(1);
    _initList(searchData);
  };

  //- 创建当前列表的选定操作
  const selectItem = (item) => {
    setVisible(false);
    getSelectItem(item);
  };

  return (
    <>
      <Popover
        placement="bottomRight"
        visible={visible}
        onVisibleChange={(status) => setVisible(status)}
        title={
          <Search placeholder={placeholderVal} onSearch={onSearch}></Search>
        }
        content={
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => selectItem(item)}
              >
                {item[searchType]}
              </List.Item>
            )}
            footer={
              <Pagination
                onChange={changePage}
                current={page.current}
                pageSize={5}
                total={total}
              />
            }
          ></List>
        }
        trigger="click"
      >
        <span className="add-icon">+</span>
      </Popover>
    </>
  );
};

export default DropPopover;

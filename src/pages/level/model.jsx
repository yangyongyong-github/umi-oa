import $http from 'api';

export default {
  namespace: 'level',
  state: {
    levelList: [], //- 职级列表
    total: 0, //- 列表长度
    levelDetail: null, //- 职级详情
  },
  reducers: {
    saveLevel: (state, { payload }) => ({ ...state, ...payload }),
    saveLevelDetail: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    //- 初始化职级列表
    *_initLevelList({ payload }, { put, call }) {
      const { data } = yield call($http.getLevelList, payload);
      yield put({
        type: 'saveLevel',
        payload: { levelList: data.list, total: data.total },
      });
    },
    //- 获取职级详情
    *_getLevelDetail({ payload }, { put, call }) {
      const { data } = yield call($http.getLevelInfo, payload);
      yield put({
        type: 'saveLevelDetail',
        payload: { levelDetail: data },
      });
      yield put({
        type: 'common/setShowDetailDialog',
        payload: { isShowDetailDialog: true },
      });
    },
  },
};

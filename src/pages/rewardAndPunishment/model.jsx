import $http from 'api';

export default {
  namespace: 'reward',
  state: {
    rewardList: [],
    total: 0,
    rewardDetail: null,
    ids: [],
  },
  reducers: {
    saveList(state, { payload }) {
      return { ...state, ...payload };
    },
    saveRewardDetail(state, { payload }) {
      return { ...state, ...payload };
    },
    saveIds(state, { payload }) {
      state.ids = payload;
      return state;
    },
  },
  effects: {
    *_initReward({ payload }, { put, call }) {
      const { data } = yield call($http.getReward, payload);
      yield put({
        type: 'saveList',
        payload: { rewardList: data.list, total: data.total },
      });
    },
    //- 获取奖惩记录详情
    *_getRewardDetail({ payload }, { put, call }) {
      const { code, data, msg } = yield call($http.getRewardDetail, payload);
      if (code) return;
      yield put({
        type: 'saveRewardDetail',
        payload: { rewardDetail: data },
      });
      yield put({
        type: 'common/setShowDetailDialog',
        payload: { isShowDetailDialog: true },
      });
    },

    *getIdList({ payload }, { put, call }) {
      yield put({
        type: 'saveIds',
        payload,
      });
    },
  },
};

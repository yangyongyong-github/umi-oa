import $http from 'api';

export default {
  namespace: 'salary',
  state: {
    salaryList: [],
    salaryTotal: 0,
    salaryDetail: null,
  },
  reducers: {
    saveSalary: (state, { payload }) => ({ ...state, ...payload }),
    saveSalaryDetail: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *_initSalaryList({ payload }, { put, call }) {
      const { data } = yield call($http.getSalaryAdjustment, payload);
      yield put({
        type: 'saveSalary',
        payload: { salaryList: data.list, salaryTotal: data.total },
      });
    },
    *_getSalaryDetail({ payload }, { put, call }) {
      const { code, data, msg } = yield call($http.getSalaryInfo, payload);
      yield put({
        type: 'saveSalaryDetail',
        payload: { salaryDetail: data },
      });
      yield put({
        type: 'common/setShowDetailDialog',
        payload: { isShowDetailDialog: true },
      });
    },
  },
};

import $http from 'api';

export default {
  namespace: 'attendanceInfo',
  state: {
    attendanceList: [],
    total: 0,
    attendanceDetail: null,
  },
  reducers: {
    saveAssessment: (state, { payload }) => ({ ...state, ...payload }),
    saveAssessmentDetail: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    * _initAttendanceList ({ payload }, { put, call }) {
      const { data: { attendanceList, total } } = yield call(
        $http.getAttendance,
        payload,
      );
      yield put({
        type: 'saveAssessment',
        payload: { attendanceList, total },
      });
    },
    * getAttendanceDetail ({ payload }, { put, call }) {
      const { data } = yield call($http.attendanceDetail, payload);
      yield put({
        type: 'saveAssessmentDetail',
        payload: { attendanceDetail: data },
      });
      yield put({
        type: 'common/setShowDetailDialog',
        payload: { isShowDetailDialog: true },
      });
    },
  },
};

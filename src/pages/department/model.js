import $http from 'api';
import { message } from 'antd';

export default {
  namespace: 'department',
  state: {
    departmentList: [],
    departmentDetail: null,
    showModalDialog: false,
  },
  reducers: {
    //- 保存部门列表
    saveDepartmentList: (state, { payload }) => ({ ...state, ...payload }),
    //- 保存部门详情
    saveDepartmentDetail: (state, { payload }) => ({ ...state, ...payload }),
    saveShowModalDialog: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    //- 获取部门列表
    *_initDepartmentList({ payload }, { put, call }) {
      const { data } = yield call($http.getDepartmentList, payload);
      yield put({
        type: 'saveDepartmentList',
        payload: { departmentList: data.list },
      });
    },
    //- 获取部门详情
    *_getDepartmentDetail({ payload }, { put, call }) {
      const { data } = yield call($http.getDepartmentDetail, payload);
      yield put({
        type: 'saveDepartmentDetail',
        payload: { departmentDetail: data },
      });
      yield put({
        type: 'saveShowModalDialog',
        payload: { showModalDialog: true },
      });
    },
    //- 新增部门
    *_addDepartment({ payload }, { put, call }) {
      const { code, msg } = yield call($http.addDepartment, payload);
      if (code) return;
      message.success(msg);
      yield put({
        type: '_initDepartmentList',
        payload: {},
      });
    },
    //- 修改部门信息
    *updateDepartmentDetail({ payload }, { put, call }) {
      const { code, msg } = yield call($http.updateDepartment, payload);
      if (code) return;
      message.success(msg);
      yield put({
        type: '_initDepartmentList',
        payload: {},
      });
      yield put({
        type: '_getDepartmentDetail',
        payload: { _id: payload._id },
      });
    },
  },
};

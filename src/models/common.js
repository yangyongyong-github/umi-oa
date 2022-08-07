import $http from 'api';
export default {
  namespace: 'common',
  state: {
    collapse: false, //- 监听侧边栏是否是小屏幕
    isShowDetailDialog: false,
    isClearForm: false,
    ids: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      //- 初始化查询用户是否登录，app.start阶段进行执行
      dispatch({ type: 'queryUserLogin', payload: { history } });
    },
  },
  reducers: {
    changeCollapse: (state, { payload }) => ({ ...state, ...payload }),
    setShowDetailDialog: (state, { payload }) => ({ ...state, ...payload }),
    clearForm: (state, { payload }) => ({ ...state, ...payload }),
    saveSelectIds: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *queryUserLogin ({ payload }, { put, call }) {
      const {
        history,
        history: {
          location: { pathname },
        },
      } = payload;
      if (pathname !== '/users/login' && pathname !== '/users/forgetPassword') {
        if (
          !sessionStorage.getItem('userProfile') ||
          !sessionStorage.getItem('token') ||
          !sessionStorage.getItem('routeList')
        ) {
          history.replace('/users/login');
        } else {
          //- 用户满足条件，进行登录信息的检测
          const res = yield call($http.queryUserLogin);
          if (res.code !== 0) return;
          const { data: routeList } = yield call($http.getRouteList);
          sessionStorage.setItem('routeList', JSON.stringify(routeList || []));
        }
      } else {
        //- 不需要进行拦截
        sessionStorage.clear();
      }

      //- 判定用户当前的访问路径
    },
  },
};

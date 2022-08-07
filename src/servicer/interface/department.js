//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取部门列表
export const getDepartmentList = (params) => {
  const reqParams = params.queryData ? params.queryData : {};
  delete params.queryData;
  return ajax.get('/department', { ...params, ...reqParams });
};

//- 获取部门详情
export const getDepartmentDetail = (params) =>
  ajax.get(`/department/${params._id}`);

//- 新增部门
export const addDepartment = (params) => ajax.post('/department', params);

//- 修改部门
export const updateDepartment = (params) =>
  ajax.put(`/department/${params._id}`, params);

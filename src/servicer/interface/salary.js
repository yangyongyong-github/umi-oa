//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取奖惩记录列表
export const getSalaryAdjustment = (params) =>
  ajax.get('/salaryAdjustment', params);

// - 获取绩效详情
export const getSalaryInfo = ({ _id }) =>
  ajax.get(`/getSalaryAdjustmentDetail/${_id}`);

// - 更新绩效信息
export const updateSalaryDetail = (params) =>
  ajax.put(`/salaryAdjustment/${params._id}`, params);

// - 创建绩效信息
export const createSalaryAdjustment = (params) =>
  ajax.post(`/salaryAdjustment`, params);

// - 删除绩效信息
export const deleteSalary = (params) => ajax.post(`/destroySalary`, params);

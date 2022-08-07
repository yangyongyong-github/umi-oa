//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取绩效考核列表
export const getAssessmentList = (params) =>
  ajax.post('/getAssessmentList', params);

// - 获取绩效详情
export const getAssessmentInfo = ({ _id }) =>
  ajax.get(`/assessment/${_id}`, {});

// - 更新绩效信息
export const updateAssessmentDetail = (params) =>
  ajax.put(`/assessment/${params._id}`, params);

// - 创建绩效信息
export const createAssessment = (params) => ajax.post(`/assessment`, params);

// - 删除绩效考核
export const deleteAssessment = (params) =>
  ajax.post(`/destroyAssessment`, params);

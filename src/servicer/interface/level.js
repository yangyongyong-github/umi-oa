//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取职级列表
export const getLevelList = (params) => ajax.post('/getLevel', params);

// - 获取职级详情
export const getLevelInfo = ({ _id }) => ajax.get(`/getLevelDetail/${_id}`, {});

// - 更新职级信息
export const updateLevelDetail = (params) =>
  ajax.put(`/updateLevel/${params._id}`, params);

// - 创建员工
export const createLevel = (params) => ajax.post(`/createLevel`, params);

// - 删除员工
export const deleteLevel = (params) => ajax.post(`/destroyLevel`, params);

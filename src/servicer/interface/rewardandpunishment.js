import ajax from '../http.js';

// - 查询奖惩记录
export const getReward = (params = {}) =>
  ajax.get('/rewardAndPunishment', params);

// - 获取奖惩记录详情
export const getRewardDetail = (params = {}) =>
  ajax.get(`/rewardAndPunishment/${params._id}`, {});

// - 新增奖惩记录
export const createReward = (params) =>
  ajax.post(`/rewardAndPunishment`, params);

// - 更新奖惩记录
export const updateReward = (params = {}) =>
  ajax.put(`/rewardAndPunishment/${params._id}`, params);

// - 删除删除奖惩记录
export const deleteReward = (params = {}) =>
  ajax.post('/deleteRewardAndPunishment', params);

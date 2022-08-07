//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 获取江城记录列表
export const getRewardAndPunishment = (params) =>
  ajax.get('/rewardAndPunishment', params);

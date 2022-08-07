//- 引入封装好的fetch方法
import ajax from '../http.js';

//- 用户登录接口api
export const analyzeStaff = () => ajax.get('/analyzeStaff');

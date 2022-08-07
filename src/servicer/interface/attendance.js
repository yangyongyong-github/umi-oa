//- 引入封装好的fetch方法
import ajax from '../http.js';

export const getAttendanceTable = () => ajax.get('/getAttendanceTable');

// - 考勤信息列表
export const getAttendance = (params = {}) =>
  ajax.post('/getAttendance', params);

// - 获取考勤信息详情
export const attendanceDetail = ({ _id }) =>
  ajax.get(`/getAttendanceDetail/${_id}`, {});

// - 新增考勤信息
export const createAttendance = (params) =>
  ajax.post(`/createAttendance`, params);

// - 修改考勤信息
export const updateAttendance = (params) =>
  ajax.put('/updateAttendance', params);

// - 删除指定考勤信息
export const deleteAttendance = (params) =>
  ajax.post('/deleteAttendance', params);

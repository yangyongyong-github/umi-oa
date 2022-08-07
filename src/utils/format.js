import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import rTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(rTime);

export const formatDate = (val, type = 'YYYY年MM月DD日') => {
  val = new Date(val).getTime();
  return dayjs(val).format(type);
};

export const formatBirth = (id) => {
  let birthday = '';
  if (id.length === 15) {
    birthday = '19' + id.slice(6, 12);
  } else if (id.length === 18) {
    birthday = id.slice(6, 14);
  }
  birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
  return birthday;
};

export const formatYear = (id, type) => {
  let year = '';
  const dateNow = new Date();

  if (type === 'age') {
    year = formatBirth(id); //-
  }
  return dateNow.getFullYear() - year.substring(0, 4);
};

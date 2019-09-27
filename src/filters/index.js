import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('two_digits', value => {
  if (value.toString().length <= 1) {
    return '0' + value.toString();
  }
  return value.toString();
});

Vue.filter('formatDate', date => {
  if (!date) return null;
  return dayjs(date).format('DD/MM/YYYY HH:mm');
});

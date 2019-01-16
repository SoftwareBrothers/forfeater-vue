import Vue from "vue";
const moment = require("moment");
Vue.filter("two_digits", value => {
  if (value.toString().length <= 1) {
    return "0" + value.toString();
  }
  return value.toString();
});
Vue.filter("moment", date => {
  if (!date) return null;
  return moment(date).format("DD/MM/YYYY HH:mm");
});

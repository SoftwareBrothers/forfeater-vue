import moment from "moment";

export function getExpireDate(seconds) {
  return moment()
    .add(seconds, "seconds")
    .toISOString();
}

export function isExpired(dateStringISO) {
  const expire = moment(dateStringISO);
  return moment().isAfter(expire);
}

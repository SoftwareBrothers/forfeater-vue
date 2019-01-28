export function getExpireDate(seconds) {
  const now = new Date().getTime();
  const date = new Date(now + seconds * 1000);
  return date.toISOString();
}

export function isExpired(date) {
  const expire = new Date(date);
  return Date.now() >= expire;
}

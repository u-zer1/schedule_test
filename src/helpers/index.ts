export const uniqID = () =>
  Math.floor(Math.random() * 1000) + new Date().getMilliseconds();

export default {};

export const addParams = (url, params) => {
  const p = params || {};
  let myString = url || '';

  Object.keys(p).forEach((key) => {
    myString = myString.replace(new RegExp(`{${key}}`, 'g'), p[key]);
  });

  return myString;
};

export const isIntegerString = (str?: string): boolean => {
  if (typeof str !== 'string' || str === '') {
    return false;
  }
  const num = Number(str);
  return !Number.isNaN(num) && Number.isSafeInteger(num);
};

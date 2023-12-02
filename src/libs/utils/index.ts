import { constants } from '@constants/env';

export const replaceAmountToStringJPY = (fare: number): string =>
  fare.toLocaleString(constants.CURRENCY_LOCALE);

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

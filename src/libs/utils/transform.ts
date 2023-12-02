import { AnyObjectType } from '@typing';

const isArray = (obj: AnyObjectType) => Array.isArray(obj);

const isObject = (obj: AnyObjectType) =>
  obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';

const checkInput = (input?: string | number) =>
  !!(input && typeof input === 'string');

const toSnakeCase = (input: string | number) => {
  const checkedInput = checkInput(input);
  if (!checkedInput) {
    return input;
  }

  const str = input as string;
  const array = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
  );
  if (array) {
    return array.map((x) => x.toLowerCase()).join('_');
  }
  return str;
};

const toCamelCase = (input: string | number) => {
  const checkedInput = checkInput(input);
  if (!checkedInput) {
    return input;
  }

  let str = input as string;
  str = str.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return str.substring(0, 1).toLowerCase() + str.substring(1);
};

export const objKeyToSnakeCase = (obj: AnyObjectType) => {
  if (isObject(obj)) {
    const o: AnyObjectType = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        o[toSnakeCase(key)] = element;
      }
    }

    return o;
  }

  return obj;
};

export const objKeyToCamelCase = (obj: AnyObjectType) => {
  if (isObject(obj)) {
    const o: AnyObjectType = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        o[toCamelCase(key)] = element;
      }
    }

    return o;
  }

  return obj;
};

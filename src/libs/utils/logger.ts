/* eslint-disable no-console */
import { SendErrorType } from '@constants';
import env from '@constants/env';
import axios from 'axios';
import { currentDateStr } from './date';

const sendSlackErrorMessage = async (...args) => {
  console.info(args);
};

export const loggingInfo = (e: unknown) => {
  console.info(e);
};

export const loggingDebug = (e: unknown) => {
  if (env.stage !== 'production' && env.stage !== 'test') {
    console.debug(e);
  }
};

const normalizeError = (e: unknown) => {
  const isPayloadSingleError =
    Object.prototype.hasOwnProperty.call(e, 'e') ||
    Object.prototype.hasOwnProperty.call(e, 'msg');

  if (isPayloadSingleError) {
    const rawError = e as {
      e: unknown;
      msg: string;
    };
    return {
      error: rawError.e,
      msg: rawError.msg,
    };
  }

  // update for logging axios error
  if (axios.isAxiosError(e)) {
    try {
      return {
        error: e,
        msg: e.response.data,
      };
    } catch (e) {
      loggingDebug(e);
    }
  }

  return {
    error: e,
  };
};

export const loggingError = async (
  name: string,
  e: unknown,
  type = SendErrorType.DEFAULT,
  slackMsg: string = undefined,
) => {
  if (env.stage === 'test') {
    return;
  }

  const { error, msg } = normalizeError(e);

  const trackingKeyword = `[tracking-${currentDateStr()}-${name}]`;

  console.error(trackingKeyword, {
    msg,
    error,
  });

  if (env.stage === 'offline') {
    return;
  }

  if (
    type === SendErrorType.DEFAULT ||
    type === SendErrorType.ALL ||
    type === SendErrorType.WITH_MSG ||
    (type === SendErrorType.NON_PROD && env.stage !== 'production')
  ) {
    await sendSlackErrorMessage(trackingKeyword, name, env.stage, slackMsg);
  }
};

import { API_PAYLOAD_RESULT } from '@constants/api';
import RESPONSE_CODES from '@constants/response-codes';
import { TypeApiResponse } from './api/response';

type TypeError = {
  error: RESPONSE_CODES;
};

export type TypeApiEventError = {
  type: API_PAYLOAD_RESULT.ERROR;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
} & TypeError;

export type TypeApiResult = TypeApiEventError | TypeApiResponse;

import { API_PAYLOAD_RESULT } from '@constants/api';
import { TypeRequestGetSample, TypeRequestPostSample } from './request';

type BaseResponse = {
  type?: API_PAYLOAD_RESULT.GREEN;
};

type ResponseGetSample = {
  queryString: TypeRequestGetSample;
} & BaseResponse;

type ResponsePostSample = {
  payloads: TypeRequestPostSample;
} & BaseResponse;

export type TypeApiResponse = ResponseGetSample | ResponsePostSample;

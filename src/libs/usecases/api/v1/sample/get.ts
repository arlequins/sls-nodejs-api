import { API_METHODS } from '@constants/api';
import { mutateApiPayload } from '@libs/utils/lambda/api-gateway';
import { TypeRequestGetSample } from '@typing/api/request';
import { TypeApiResult } from '@typing/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

const get = async (event: APIGatewayProxyEvent): Promise<TypeApiResult> => {
  const payload = mutateApiPayload<null, null, TypeRequestGetSample>(
    API_METHODS.GET,
    event,
  );

  const queryString = payload.queryString;

  return {
    queryString,
  };
};

export default get;

import { API_METHODS } from '@constants/api';
import { mutateApiPayload } from '@libs/utils/lambda/api-gateway';
import { TypeRequestPostSample } from '@typing/api/request';
import { TypeApiResult } from '@typing/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

const makePayloads = (body: TypeRequestPostSample): TypeRequestPostSample => ({
  ...body,
});

const post = async (event: APIGatewayProxyEvent): Promise<TypeApiResult> => {
  const payload = mutateApiPayload<TypeRequestPostSample, null, null>(
    API_METHODS.POST,
    event,
  );

  const body = payload.body;
  const payloads = makePayloads(body);

  return {
    payloads,
  };
};

export default post;

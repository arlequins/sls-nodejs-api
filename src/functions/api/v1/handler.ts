import { loggingDebug } from '@libs/utils/logger';
import { API_METHODS } from '@constants/api';
import { validateApiCommon } from '@libs/utils/lambda/warp-middleware';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { main as GetSample } from './sample/get';
import { main as PostSample } from './sample/post';

const API_MAPPING = {
  '/api/v1/sample': {
    [API_METHODS.GET]: GetSample,
    [API_METHODS.POST]: PostSample,
  },
};

const handler: APIGatewayProxyHandler = async (event) => {
  const resource = event.resource;
  const method = event.httpMethod;

  loggingDebug({
    type: 'START',
    resource,
    method,
    event: JSON.stringify(event),
  });

  await validateApiCommon(event);

  const fn = API_MAPPING[resource][method];

  const result = await fn(event);

  loggingDebug({
    type: 'END',
    result: JSON.stringify(result),
  });

  return result;
};

export const main = handler;

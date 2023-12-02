import usecasePostSample from '@libs/usecases/api/v1/sample/post';
import { makeApiResponse } from '@libs/utils/lambda/api-gateway';
import warpMiddleware, {
  resultApiHeaders,
} from '@libs/utils/lambda/warp-middleware';
import { loggingDebug } from '@libs/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

const postSample: APIGatewayProxyHandler = async (event) => {
  loggingDebug(JSON.stringify(event));
  const result = await usecasePostSample(event);
  loggingDebug(JSON.stringify(result));
  const response = makeApiResponse(result);

  return resultApiHeaders(response);
};

export const main = warpMiddleware(postSample);

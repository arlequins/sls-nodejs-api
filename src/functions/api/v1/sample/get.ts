import usecaseGetSample from '@libs/usecases/api/v1/sample/get';
import { makeApiResponse } from '@libs/utils/lambda/api-gateway';
import warpMiddleware, {
  resultApiHeaders,
} from '@libs/utils/lambda/warp-middleware';
import { loggingDebug } from '@libs/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

const getSample: APIGatewayProxyHandler = async (event) => {
  loggingDebug(JSON.stringify(event));
  const result = await usecaseGetSample(event);
  loggingDebug(JSON.stringify(result));
  const response = makeApiResponse(result);

  return resultApiHeaders(response);
};

export const main = warpMiddleware(getSample);

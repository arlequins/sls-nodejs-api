import batchSample from '@libs/usecases/batch/v1/minutely';
import { formatJsonResponse } from '@libs/utils/lambda/api-gateway';
import warpMiddleware from '@libs/utils/lambda/warp-middleware';
import { loggingDebug } from '@libs/utils/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

const batchMinutely: APIGatewayProxyHandler = async (event) => {
  loggingDebug({
    type: 'START',
    event,
  });

  const [sample] = await Promise.all([batchSample()]);

  loggingDebug({
    type: 'END',
    sample,
  });

  return formatJsonResponse({
    result: {
      sample,
    },
  });
};

export const main = warpMiddleware(batchMinutely, false);

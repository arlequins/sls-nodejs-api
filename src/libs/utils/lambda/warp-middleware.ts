import { secrets, constants } from '@constants/env';
import createHttpError from 'http-errors';
import {
  formatJsonErrorResponse,
  mutateApiPayload,
} from '@libs/utils/lambda/api-gateway';
import { TypePayload } from '@typing/api';
import { APIGatewayProxyHandler } from 'aws-lambda';
import middyfy from './middyfy';

const maintenanceModeHanlder = async () => {
  const error = createHttpError.ServiceUnavailable('maintenance');
  return formatJsonErrorResponse(error.message, error.statusCode);
};

export const resultAdditionalHeaders = (response, additionalHeaders?) => ({
  ...response,
  headers: {
    'Strict-Transport-Security': 'max-age=63072000; includeSubdomains; preload',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Xss-Protection': '1; mode=block',
    'Cache-Control': 'no-cache, no-store, must-revalidate, private',
    Pragma: 'no-cache',
    Expires: '0',
    ...additionalHeaders,
  },
});

export const resultApiHeaders = (response) =>
  resultAdditionalHeaders(response, {
    'Access-Control-Allow-Origin': constants.ALLOWED_ORIGIN,
    'Access-Control-Allow-Credentials': true,
  });

export const validateApiCommon = async <S, Y, Z>(
  event,
): Promise<TypePayload<S, Y, Z>> => mutateApiPayload(event.httpMethod, event);

const warpMiddleware = (
  handler: APIGatewayProxyHandler,
  isParsing = true,
  isBypass = false,
) => {
  if (secrets.MAINTENANCE_MODE && !isBypass) {
    return maintenanceModeHanlder;
  }

  return isParsing ? middyfy(handler) : handler;
};

export default warpMiddleware;

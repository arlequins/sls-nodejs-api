import type { APIGatewayProxyEvent } from 'aws-lambda';
import { API_METHODS, API_PAYLOAD_RESULT } from '@constants/api';
import RESPONSE_CODES from '@constants/response-codes';
import { TypePayload } from '@typing/api';
import { TypeApiResult } from '@typing/core';
import createHttpError from 'http-errors';

export const formatJsonResponse = (
  response: Record<string, unknown>,
  {
    statusCode,
  }: {
    statusCode?: number;
  } = {
    statusCode: 200,
  },
) => ({
  statusCode,
  body: JSON.stringify(response),
});

export const formatJsonErrorResponse = (
  message: string,
  statusCode: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
) =>
  formatJsonResponse(
    {
      message,
      data,
    },
    { statusCode },
  );

const makePayload = (event) => ({
  headers: event.headers,
  path: event.path,
  method: event.httpMethod,

  requestId: event.requestContext?.requestId,
  extendedRequestId: event.requestContext?.extendedRequestId,
  apiId: event.requestContext?.apiId,
  requestTimeEpoch: event.requestContext?.requestTimeEpoch,
  requestContext: event.requestContext,

  rawBody: event.rawBody,

  body: event.body,
  pathParameters: event.pathParameters,
  queryString: event.queryStringParameters,
});

export const mutateApiPayload = <TypeBody, TypePath, TypeQueryString>(
  method: API_METHODS,
  event: APIGatewayProxyEvent,
): TypePayload<TypeBody, TypePath, TypeQueryString> => {
  if (method === API_METHODS.POST && !event.body) {
    throw createHttpError.BadRequest(RESPONSE_CODES.ERROR_BAD_PARAMS);
  }

  return makePayload(event);
};

export const makeApiResponse = (result: TypeApiResult) => {
  if (result.type === API_PAYLOAD_RESULT.ERROR) {
    const error = createHttpError.BadRequest(result.error);
    return formatJsonErrorResponse(
      error.message,
      error.statusCode,
      result.data,
    );
  }

  return formatJsonResponse(result);
};

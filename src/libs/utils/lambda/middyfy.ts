import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { APIGatewayProxyHandler } from 'aws-lambda';

const middyfy = (handler: APIGatewayProxyHandler) =>
  middy().use(jsonBodyParser()).use(httpErrorHandler()).handler(handler);

export default middyfy;

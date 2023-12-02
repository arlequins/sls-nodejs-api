import {
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
} from 'aws-lambda';

type CommonPayloadOriginaRequest = {
  headers: APIGatewayProxyEventHeaders;
  method: string;
  path: string;
  pathParameters: APIGatewayProxyEventPathParameters;
  rawBody: string;
};

export type TypePayload<S, Y, Z> = {
  body?: S;
  pathParameters: Y;
  queryString: Z;
} & CommonPayloadOriginaRequest;

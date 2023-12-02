import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';

export const makeEmptyPayload = () => {
  const event = {
    headers: {
      'Content-Type': 'text/plain',
    },
  } as unknown as APIGatewayProxyEvent;
  const context = {} as Context;
  const callback = null as Callback;

  return {
    event,
    context,
    callback,
  };
};

import { makeEmptyPayload } from '@tests/utils';
import { main as handler } from './handler';

describe('Main Handler', () => {
  it('check default response path', async () => {
    const payload = makeEmptyPayload();
    const response = await handler(
      payload.event,
      payload.context,
      payload.callback,
    );

    expect(`${response.statusCode}`).toMatch('200');
  });
});

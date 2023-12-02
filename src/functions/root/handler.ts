// import testClient from '@libs/adaptors/aurora/client';
import { formatJsonResponse } from '@libs/utils/lambda/api-gateway';
import warpMiddleware, {
  resultAdditionalHeaders,
} from '@libs/utils/lambda/warp-middleware';
import { APIGatewayProxyHandler } from 'aws-lambda';

const root: APIGatewayProxyHandler = async () =>
  resultAdditionalHeaders(
    formatJsonResponse({
      message: `good`,
    }),
  );
export const main = warpMiddleware(root);

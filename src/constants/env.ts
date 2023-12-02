import { EnvStage } from '@typing';
import ENV_SECRET from '@settings/env.json';
import {
  TypeEnv,
  TypeEnvConstants,
  TypeEnvServerless,
  TypeEnvSecret,
} from '@typing/env';

const COMMON_URLS = {
  API_SAMPLE: 'https://api.sample.net',
};

const DEVELOP_URLS = {
  ...COMMON_URLS,
  CDN: 'https://sample.cloudfront.net',
  API_SAMPLE2: 'https://api.sample.net',
};

const URLS = {
  [EnvStage.TEST]: DEVELOP_URLS,
  [EnvStage.OFFLINE]: DEVELOP_URLS,
  [EnvStage.DEVELOP]: DEVELOP_URLS,
  [EnvStage.PRODUCTION]: {
    ...COMMON_URLS,
    CDN: 'https://sample.cloudfront.net',
    API_SAMPLE2: 'https://api.sample.net',
  },
};

const isTest = process.env.NODE_ENV === 'test';
const serverlessEnv: TypeEnvServerless = isTest
  ? {
      isTest,
      stage: EnvStage.TEST,
      isOffline: true,
      region: 'us-east-1',
      endpoint: 'http://127.0.0.1:6000',
      db: {
        database: '',
        host: '',
        user: '',
        port: 5432,
      },
    }
  : {
      isTest,
      stage: process.env.STAGE as EnvStage,
      isOffline: process.env.IS_OFFLINE as unknown as boolean,
      region: process.env.REGION,
      endpoint: process.env.IS_OFFLINE && 'http://127.0.0.1:6000',
      db: {
        database: process.env.DB_DATABASE_NAME,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT, 10),
      },
    };

const CDN_URL = ((cdnUrl: string) => `${cdnUrl}/statics`)(
  URLS[serverlessEnv.stage].CDN,
);

const makeEnvValue = (stage: EnvStage) => ({
  ALLOWED_ORIGIN: process.env.IS_OFFLINE
    ? 'http://localhost:5173'
    : URLS[stage].CDN,
  IMAGES: {
    SAMPLE: `${CDN_URL}/sample.png`,
  },
});

const ENV_VALUES = {
  test: makeEnvValue(EnvStage.DEVELOP),
  offline: makeEnvValue(EnvStage.DEVELOP),
  develop: makeEnvValue(EnvStage.DEVELOP),
  production: makeEnvValue(EnvStage.PRODUCTION),
};

export const secrets: TypeEnvSecret = {
  ...ENV_SECRET,
  MAINTENANCE_MODE:
    (ENV_SECRET.MAINTENANCE_MODE as unknown as string) === 'true',
};

export const constants: TypeEnvConstants = {
  CURRENCY_LOCALE: 'ja-JP',
  PLACEHOLDER_IMAGE: 'https://via.placeholder.com/550x309?text=No+Image',
  API_TIMEOUT: 20000, // 20 secs
  MICO_API_TIMEOUT: 1200000, // 120 secs
  ALLOWED_ORIGIN: ENV_VALUES[serverlessEnv.stage].ALLOWED_ORIGIN,
  CDN_URL,
  API_SAMPLE: URLS[serverlessEnv.stage].API_SAMPLE,
  API_SAMPLE2: URLS[serverlessEnv.stage].API_SAMPLE2,
  VALUES_IMAGES: ENV_VALUES[serverlessEnv.stage].IMAGES,
};

const env: TypeEnv = {
  ...serverlessEnv,
  secrets,
  constants,
};

export default {
  ...env,
};

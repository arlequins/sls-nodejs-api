import { EnvStage } from '.';

export type TypeEnvServerless = {
  isTest: boolean;
  stage: EnvStage;
  isOffline: boolean;
  region: string;
  endpoint: string;
  db: {
    database: string;
    host: string;
    user: string;
    port: number;
  };
};

export type TypeEnvSecret = {
  MAINTENANCE_MODE: boolean;
};

export type TypeEnvConstants = {
  CURRENCY_LOCALE: 'ja-JP';
  PLACEHOLDER_IMAGE: string;
  API_TIMEOUT: number;
  MICO_API_TIMEOUT: number;
  ALLOWED_ORIGIN: string;
  CDN_URL: string;
  API_SAMPLE: string;
  API_SAMPLE2: string;
  VALUES_IMAGES: {
    SAMPLE: string;
  };
};
export type TypeEnv = {
  secrets: TypeEnvSecret;
  constants: TypeEnvConstants;
} & TypeEnvServerless;

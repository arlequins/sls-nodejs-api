export interface AnyObjectType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const enum EnvStage {
  TEST = 'test',
  OFFLINE = 'offline',
  DEVELOP = 'develop',
  PRODUCTION = 'production',
}

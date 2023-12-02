const enum PROCESS_ERROR {
  DATABASE_TIMEOUT = 'database response is over 5 secs',
  INTERNAL_ERROR = 'internal error',
  UNDEFINED_ERROR = 'undefiend error',
  SERVICE_STOPPED = 'service stopped',
  NO_MAPPING_API = 'there is no mapping api',
}

export default PROCESS_ERROR;

const enum RESPONSE_CODES {
  INIT = 'init',
  OK_GREEN = 'green',
  SKIP = 'skip',
  ERROR_VALIDATION = 'validation error',
  ERROR_EMPTY = 'empty message',
  ERROR_UNKNOWN = 'unknown error',
  ERROR_BAD_PARAMS = 'bad params',
  ERROR_ALREADY_USED = 'already existed',
  ERROR_ALREADY_ERROR = 'already error',
  ERROR_UNEXPECTED = 'unexpected',
  ERROR_EXPIRES = 'expires',
  ERROR_MAINTENANCE_MODE = 'maintenance mode',
  ERROR_REQUEST_FAIL = 'request is failed',
  ERROR_COMMIT = 'commit error',
}

export default RESPONSE_CODES;

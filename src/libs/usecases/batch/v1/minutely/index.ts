import RESPONSE_CODES from '@constants/response-codes';

const batchSample = async () => {
  const results: {
    status: boolean;
  }[] = [];

  const list = [];

  if (list.length) {
    return {
      message: RESPONSE_CODES.ERROR_UNEXPECTED,
      data: {
        status: false,
      },
    };
  }

  return {
    message: RESPONSE_CODES.OK_GREEN,
    data: {
      status: true,
      row: results,
    },
  };
};

export default batchSample;

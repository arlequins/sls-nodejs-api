const ReplaceServersURL = require('./decorators/replace-servers-url.js');
const id = 'plugin';

/** @type {import('@redocly/cli').DecoratorsConfig} */
const decorators = {
  oas3: {
    'replace-servers-url': ReplaceServersURL,
  },
};

module.exports = {
  id,
  decorators,
};

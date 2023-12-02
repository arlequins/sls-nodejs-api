module.exports = ReplaceServersURL;

/** @type {import('@redocly/cli').OasDecorator} */

function ReplaceServersURL({ serverUrl }) {
  return {
    Server: {
      leave(Server) {
        if (serverUrl) {
          Server.url = serverUrl;
        }
      },
    },
  };
}

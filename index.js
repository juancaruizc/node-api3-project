// require your server and launch it
const server = require('./api/server');

const port = 5000;

server.listen(() => {
  console.log(`listening on port:${port}`);
});

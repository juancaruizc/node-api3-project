const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');
const middleware = require('./middleware/middleware');

const cors = require('cors');

const path = require('path');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(express.json(), morgan('dev'));
server.use(middleware.logger);

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.use(cors());
server.use(express.static(path.join(__dirname, 'client/build, index.html')));
// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;

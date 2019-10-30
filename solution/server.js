const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');
const dateLogger = require('./api/dateLogger-middleware.js');

const server = express();

function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
}

// change the gatekeeper to return a 400 if no password is provided and a message
// that says please provide a password
// if a password is provided and it is mellon, call next, otherwise return a 401
// and the you shall not pass message
const gateKeeper = (req, res, next) => {
  // data can come in the body, url parameters, query string, headers
  // new way of reading data sent by the client
  const password = req.headers.password || '';

  if (password) {
    if (password.toLowerCase() === 'mellon') {
      next();
    } else {
      res.status(401).json({ you: 'cannot pass!!' });
    }
  } else {
    res.status(400).json({ riddle: 'speak friend and enter' });
  }
};

function doubler(req, res, next) {
  // everything coming from the url is a string

  const number = Number(req.query.number || 0);

  req.doubled = number * 2;

  next();
}

// global middleware
server.use(helmet()); // third party
server.use(express.json()); // built-in
server.use(gateKeeper);
// server.use(dateLogger); // custom middleware
server.use(morgan('dev'));

server.use('/api/hubs', logger('Logger for hubs: '), doubler, hubsRouter);

server.get('/', logger('Logger on /'), doubler, (req, res) => {
  res.status(200).json({ number: req.doubled });
});

module.exports = server;

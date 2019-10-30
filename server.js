const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

function logMeth(req, res, next) {
  console.log(`
    ${req.method} has been made.
  `)

  next();
}

function doubler(req, res, next) {
  const number = Number(req.query.number || 0)
  req.doubled = number*2;
  next();
}

function gateKeeper(req, res, next) {
    const password = req.headers.password || '';

    if (password && password.toLowerCase() === 'mellon') {
      next();
    } else if (!!password === false) {
      res.status(400).json({ message: "provide password"})
    } else {
      res.status(401).json({ you: "Shall not pass" })
    }
}

server.use(gateKeeper)
server.use(helmet());
server.use(express.json());

server.use('/api/hubs', hubsRouter);
server.use(morgan('dev'))

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

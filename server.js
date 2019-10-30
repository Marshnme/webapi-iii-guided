const express = require('express'); // importing a CommonJS module
const helmet = require("helmet")
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//custom middleware

function logger(req, res, next) {
  console.log(new Date().toISOString(), `${req.method} ${req.originalUrl}`)

  next();
};

//global middleware
server.use(helmet());
server.use(express.json());
server.use(logger)

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

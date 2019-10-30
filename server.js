const express = require('express'); // importing a CommonJS module
const helmet = require("helmet")
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require("morgan")
const server = express();

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}]`, `${req.method} ${req.originalUrl}`)

  next();
};


function gateKeeper(req,res,next){
  const password = req.headers.password || "";

  if(password.toLowerCase() === "mellon"){
    next();
  }else if(!password){
    res.status(400).json({message:"Must include pass"})
  }else{
    res.status(401).json({message:"YOU CAN NOT PASS"})
  }
}

//global middleware
server.use(helmet());
server.use(express.json());
server.use(gateKeeper);
server.use(logger);
server.use(morgan("dev"));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

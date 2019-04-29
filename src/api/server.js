// const jwt = require('jsonwebtoken');

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const fse = require('fs-extra');
// const https = require('https');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const categoriesRoute = require('./controllers/categories');
const jwtRoute = require('./controllers/jwt');
const usersController = require('./controllers/usersController');

const server = express();

// enable CORS - Cross Origin Resource Sharing
server.use(cors());
// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// server.use((req, res, next) => {
//   // eslint-disable-next-line no-console
//   console.log(`${new Date().toString()} => ${req.originalUrl}`);
//   next();
// });
server.use(morgan('combined'));
server.use(categoriesRoute);
server.use(jwtRoute);
server.use(usersController);

// QueryString => query property on the request object
// localhost:8080/api?name=kelvin&&age=20
server.get('/api', (req, res) => {
  if (req.query.name) {
    res.send(`You have a requested an api ${req.query.name}`);
  } else {
    res.send(`You have a requested an api`);
  }
});

const port = process.env.SERVER_PORT || 8080;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port: ${port}`);
});

// https
//   .createServer(
//     {
//       key: fse.readFileSync('server.key'),
//       cert: fse.readFileSync('server.cert')
//     },
//     server
//   )
//   .listen(port, () => {
//     // eslint-disable-next-line no-console
//     console.log(`listening on port: ${port}`);
//   });

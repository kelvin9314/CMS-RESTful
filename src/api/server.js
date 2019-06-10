/* eslint-disable no-unused-vars */
/**
 * This a the main file of the server
 */
require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
// const fse = require('fs-extra');
// const https = require('https');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/db');
const errorMsg = require('./libs/errorMsg');
const usersController = require('./controllers/usersController');
const booksController = require('./controllers/booksController');
const verifyToken = require('./controllers/functions/verifyToken');

const server = express();

// connect to DB
db.getConnectionDB();

// enable CORS - Cross Origin Resource Sharing
server.use(cors());
server.use('/books', verifyToken);
// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('combined'));

server.use('/users', usersController);
server.use('/books', booksController);

/* 404 handler */
server.use((req, res, next) => {
  next(createError(404, errorMsg.urlNotFound()));
});

/* error handler */
server.use((err, req, res, next) => {
  res.status(err.status || 500).json(err);
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

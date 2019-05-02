/* eslint-disable no-unused-vars */
/**
 * This a the main file of the server
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const fse = require('fs-extra');
// const https = require('https');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models/db');
const errorMsg = require('./libs/errorMsg');
const usersController = require('./controllers/usersController');
const booksController = require('./controllers/booksController');

const server = express();

// connect to DB
db.getConnectionDB();

// enable CORS - Cross Origin Resource Sharing
server.use(cors());
// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan('combined'));

server.use(usersController);
server.use(booksController);

/* 404 handler */
server.use((req, res) => {
  res.status(404).json({ Errpr: true, Message: errorMsg.urlNotFound() });
});

/* error handler */
server.use((err, req, res, next) => {
  res.status(err.status || 500);
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

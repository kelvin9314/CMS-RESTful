/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

const server = process.env.DB_SERVER;
const database = process.env.DB_database;

/**
 * Different actions in Mongo DB with Mongoose
 * @exports db
 */

function getConnectionDB() {
  mongoose.set('useNewUrlParser', true);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  /* running the mongoDB locally on my onw laptop while developing (kelvin) */
  mongoose.connect(`mongodb://${server}/${database}`, err => {
    if (!err) {
      console.log('MongoDB connected...');
    } else {
      console.log(`Error in DB connection : ${err}...`);
    }
  });
}

function closeConnectionDB() {
  mongoose.connection.close(() => {
    console.log('MongoDB disconnected...');
    process.exit(0);
  });
}

module.exports = { getConnectionDB, closeConnectionDB };

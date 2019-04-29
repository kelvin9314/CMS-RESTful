/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const UsersModel = require('../models/users.model');
require('dotenv').config();

const router = express.Router();
const saltRounds = 10;

router.post('/users/register', async (req, res) => {
  /* check the  data type */
  const { error } = validDateUsersFormat(req.body);
  if (error) return res.status(400).send(error.details[0]);

  // connect to DB
  db.getConnectionDB();

  /*  check the data is exists in DB or not  */
  const isExistsID = await UsersModel.findOne({ employeeID: req.body.employeeID }).then(doc => {
    return doc !== null;
  });
  const isExistsName = await UsersModel.findOne({ name: req.body.name }).then(doc => {
    return doc !== null;
  });
  const isExistsEmail = await UsersModel.findOne({ email: req.body.email }).then(doc => {
    return doc !== null;
  });

  if (isExistsID) return res.status(401).send({ message: 'EmployeeID is repeated ~' });
  if (isExistsName) return res.status(401).send({ message: 'name is repeated' });
  if (isExistsEmail) return res.status(401).send({ message: 'email is repeated' });

  const { password } = req.body;

  bcrypt.hash(password, saltRounds).then(hash => {
    req.body.password = hash;

    const model = new UsersModel(req.body);
    model.save().then(doc => {
      return !doc || doc.length === 0 ? res.status(500).send(doc) : res.status(201).send('Account Created !.!');
    });
  });
});

router.get('/users/login', (req, res) => {
  const { error } = validDateLoginFormat(req.query);
  if (error) return res.status(401).send({ message: 'Incorrect with employeeID or password !.!' });
  // if (error) return res.status(400).send(error.details[0]);

  // connect to DB
  db.getConnectionDB();

  UsersModel.findOne({ employeeID: req.query.employeeID })
    .then(doc => {
      bcrypt.compare(req.query.password, doc.password).then(result => {
        // ? res.status(200).send({ employeeID: doc.employeeID, name: doc.name, email: doc.email })
        if (result) {
          /* Create JWT */
          const payload = {
            employeeID: doc.employeeID,
            name: doc.name,
            email: doc.email
          };
          /*  about 15 mins */
          const time = Math.floor(Date.now() / 1000) + 60 * 15;
          jwt.sign({ payload, expiresIn: time }, process.env.SECRET_KEY, (err, token) => {
            res.status(200).send({ message: 'Login successful', token });
          });
        } else {
          res.status(401).send({ message: 'Incorrect with employeeID or password !.!' });
        }
      });
    })
    .catch(() => {
      res.status(401).send({ message: 'Incorrect with employeeID or password !.!' });
    });
});

validDateUsersFormat = accountData => {
  const schema = Joi.object().keys({
    employeeID: Joi.string()
      .alphanum()
      .length(5)
      .trim()
      .required(),
    name: Joi.string()
      .max(20)
      .trim()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{8,72}$/)
      .required(),
    isAdmin: Joi.boolean()
  });

  const result = Joi.validate(accountData, schema);

  return result;
};

validDateLoginFormat = loginData => {
  const schema = Joi.object().keys({
    employeeID: Joi.string()
      .alphanum()
      .length(5)
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{8,72}$/)
      .required()
  });

  const result = Joi.validate(loginData, schema);

  return result;
};

module.exports = router;

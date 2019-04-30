/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model');
require('dotenv').config();
const verifyToken = require('./functions/verifyToken');
const checkAdmin = require('./functions/checkAdmin');
const errorMsg = require('../responseMessage/errorMsg');
const grantMsg = require('../responseMessage/grantMsg');

const router = express.Router();
const saltRounds = 10;

router.post('/users/register', async (req, res) => {
  /* check the  data type */
  const { error } = validDateUsersFormat(req.body);
  if (error) return res.status(400).json(error.details[0]);

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

  if (isExistsID) return res.status(401).json({ Error: true, Message: errorMsg.repeatedID() });
  if (isExistsName) return res.status(401).json({ Error: true, Message: errorMsg.repeatedName() });
  if (isExistsEmail) return res.status(401).json({ Error: true, Message: errorMsg.repeatedEmail() });

  const { password } = req.body;

  bcrypt.hash(password, saltRounds).then(hash => {
    req.body.password = hash;

    const model = new UsersModel(req.body);
    model.save().then(doc => {
      return !doc || doc.length === 0
        ? res.status(500).json({ Error: true, doc })
        : res.status(201).json({ Error: false, Message: grantMsg.accountCreated() });
    });
  });
});

router.post('/users/login', (req, res) => {
  const { error } = validDateLoginFormat(req.body);
  if (error) return res.status(401).json({ Error: true, Message: errorMsg.loginFailure() });
  // if (error) return res.status(400).send(error.details[0]);

  UsersModel.findOne({ employeeID: req.body.employeeID })
    .then(doc => {
      bcrypt.compare(req.body.password, doc.password).then(result => {
        // ? res.status(200).send({ employeeID: doc.employeeID, name: doc.name, email: doc.email })
        if (result) {
          /* Create JWT */
          const payload = {
            employeeID: doc.employeeID,
            name: doc.name,
            email: doc.email
          };
          /* asynchronous way , by default using HS256 */
          jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
            res.status(200).json({ Error: false, Message: grantMsg.loginSuccessful(), token });
          });
        } else {
          res.status(401).json({ Error: true, Message: errorMsg.loginFailure() });
        }
      });
    })
    .catch(() => {
      res.status(401).json({ Error: true, Message: errorMsg.loginFailure() });
    });
});

router.get('/users/list', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.status(403).json({ Error: true, Message: err });
    } else {
      const requesterID = authData.payload.employeeID;
      const requesterName = authData.payload.name;

      const checkObject = await checkAdmin(requesterID, requesterName);

      if (checkObject === null) {
        res.status(403).json({ Error: true, Message: errorMsg.permissionDenied() });
      } else if (checkObject.isAdmin === true) {
        UsersModel.find({}, (error, users) => {
          if (error) {
            res.status(500).json({ Error: true, Message: error });
          } else {
            // res.json(users);
            const usersList = [];
            users.map(user => {
              const { employeeID, name, email, isAdmin } = user;
              const filterData = {
                employeeID,
                name,
                email,
                isAdmin
              };
              return usersList.push(filterData);
            });
            res.json({ Error: false, usersList, authData });
          }
        });
      }
    }
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

/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UsersModel = require('../models/users.model');
require('dotenv').config();
const verifyToken = require('./functions/verifyToken');
const checkAdmin = require('./functions/checkAdmin');
const errorMsg = require('../libs/errorMsg');
const grantMsg = require('../libs/grantMsg');
const { validDateUsersFormat, validDateLoginFormat } = require('../libs/joiCheck');

const router = express.Router();
const saltRounds = 10;

router.post('/register', async (req, res, next) => {
  /* check the  data type */
  const { error } = validDateUsersFormat(req.body);
  if (error) return next(createError(400, error.details[0].message));

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

  if (isExistsID) return next(createError(409, errorMsg.repeatedID()));
  if (isExistsName) return next(createError(409, errorMsg.repeatedName()));
  if (isExistsEmail) return next(createError(409, errorMsg.repeatedEmail()));

  const { password } = req.body;

  bcrypt.hash(password, saltRounds).then(hash => {
    req.body.password = hash;

    const model = new UsersModel(req.body);
    model.save().then(doc => {
      return !doc || doc.length === 0
        ? next(createError(500))
        : res.status(201).json({ message: grantMsg.accountCreated() });
    });
  });
});

router.post('/login', (req, res, next) => {
  const { error } = validDateLoginFormat(req.body);

  if (error) return next(createError(400, errorMsg.loginFailure()));
  // if (error) return res.status(400).send(error.details[0]);

  UsersModel.findOne({ employeeID: req.body.employeeID })
    .then(async doc => {
      const result = await bcrypt.compare(req.body.password, doc.password);
      if (result) {
        /* Create JWT */
        const payload = {
          employeeID: doc.employeeID,
          name: doc.name,
          email: doc.email
        };
        /* asynchronous way , by default using HS256 */
        // jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
        jwt.sign({ payload }, process.env.SECRET_KEY, (err, token) => {
          res.status(200).json({ message: grantMsg.loginSuccessful(), token });
        });
      } else {
        // password invalid
        next(createError(401, errorMsg.loginFailure()));
      }
    })
    .catch(() => {
      // employeeID invalid
      next(createError(401, errorMsg.loginFailure()));
    });
});

/**
 *  update information for a single user
 *  PUT
 *  localhost:8080/users?employeeID=12345
 */
router.put('/update', verifyToken, async (req, res, next) => {
  const { authData } = req;
  const requesterID = authData.payload.employeeID;
  const requesterName = authData.payload.name;

  const checkObject = await checkAdmin(requesterID, requesterName);

  if (checkObject === null) return next(createError(403, errorMsg.permissionDenied()));

  if (checkObject.isAdmin === true) {
    if (!req.query.employeeID) return next(createError(400, errorMsg.missingEmployeeID()));
    const targetID = req.query.employeeID;

    const { error } = validDateUsersUpdate(req.body);
    if (error) return next(createError(400, error.details[0].message));

    if (req.body.password) {
      const { password } = req.body;

      bcrypt
        .hash(password, saltRounds)
        .then(hash => {
          req.body.password = hash;
          UsersModel.findOneAndUpdate({ employeeID: targetID }, req.body, { new: true })
            .then(doc => res.status(202).json({ message: `${grantMsg.userUpdated()}`, Data: doc }))
            .catch(e => next(createError(500, e)));
        })
        .catch(errors => next(createError(500, errors)));
    } else {
      UsersModel.findOneAndUpdate({ employeeID: targetID }, req.body, { new: true })
        .then(doc => res.status(202).json({ message: `${grantMsg.userUpdated()}`, Data: doc }))
        .catch(e => next(createError(500, e)));
    }
  }
});

router.get('/list', verifyToken, async (req, res, next) => {
  const { authData } = req;
  const requesterID = authData.payload.employeeID;
  const requesterName = authData.payload.name;

  const checkObject = await checkAdmin(requesterID, requesterName);

  if (checkObject === null) {
    next(createError(403, errorMsg.permissionDenied()));
  } else if (checkObject.isAdmin === true) {
    UsersModel.find({})
      .then(users => {
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
        res.status(200).json({ Data: usersList, authData });
      })
      .catch(error => {
        next(createError(500, error));
      });
  }
});

/**
 *  delete a single user
 *  localhost:8080/users?employeeID=12345
 */
router.delete('/delete', verifyToken, async (req, res) => {
  const { authData } = req;
  const requesterID = authData.payload.employeeID;
  const requesterName = authData.payload.name;

  const checkObject = await checkAdmin(requesterID, requesterName);

  if (checkObject === null) {
    next(createError(403, errorMsg.permissionDenied));
  } else if (checkObject.isAdmin === true) {
    if (!req.query.employeeID) return next(createError(400, errorMsg.missingEmployeeID()));
    const targetID = req.query.employeeID;

    UsersModel.findOneAndDelete({ employeeID: targetID }, (error, user) => {
      if (error) {
        next(createError(500, error));
      } else if (user === null) {
        res.status(202).json({ message: grantMsg.noContent() });
      } else {
        res.status(202).json({ message: `${grantMsg.userDeleted()}` });
      }
    });
  }
});

module.exports = router;

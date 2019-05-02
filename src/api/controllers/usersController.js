/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model');
require('dotenv').config();
const verifyToken = require('./functions/verifyToken');
const checkAdmin = require('./functions/checkAdmin');
const errorMsg = require('../libs/errorMsg');
const grantMsg = require('../libs/grantMsg');
const { validDateUsersFormat, validDateLoginFormat } = require('../libs/joiCheck');

const router = express.Router();
const saltRounds = 10;

router.post('/users/register', async (req, res) => {
  /* check the  data type */
  const { error } = validDateUsersFormat(req.body);
  if (error) return res.status(400).json({ Error: true, Message: error.details[0].message });

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

  if (isExistsID) return res.status(400).json({ Error: true, Message: errorMsg.repeatedID() });
  if (isExistsName) return res.status(400).json({ Error: true, Message: errorMsg.repeatedName() });
  if (isExistsEmail) return res.status(400).json({ Error: true, Message: errorMsg.repeatedEmail() });

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
          res.status(200).json({ Error: false, Message: grantMsg.loginSuccessful(), token });
        });
      } else {
        res.status(401).json({ Error: true, Message: errorMsg.loginFailure() });
      }
    })
    .catch(() => {
      res.status(401).json({ Error: true, Message: errorMsg.loginFailure() });
    });
});

/**
 *  update information for a single user
 *  PUT
 *  localhost:8080/users?employeeID=12345
 */
router.put('/users/update', verifyToken, (req, res) => {
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
        if (!req.query.employeeID) return res.status(400).json({ Error: true, Message: errorMsg.missingEmployeeID() });
        const targetID = req.query.employeeID;

        const { error } = validDateUsersUpdate(req.body);
        if (error) return res.status(400).json({ Error: true, Message: error.details[0].message });

        if (req.body.password) {
          const { password } = req.body;

          bcrypt
            .hash(password, saltRounds)
            .then(hash => {
              req.body.password = hash;
              UsersModel.findOneAndUpdate({ employeeID: targetID }, req.body, { new: true })
                .then(doc => res.status(202).json({ Error: false, Message: `${grantMsg.userUpdated()}`, Data: doc }))
                .catch(e => res.status(500).json({ Error: true, Message: e }));
            })
            .catch(errors => res.status(500).json({ Error: true, Message: errors }));
        } else {
          UsersModel.findOneAndUpdate({ employeeID: targetID }, req.body, { new: true })
            .then(doc => res.status(202).json({ Error: false, Message: `${grantMsg.userUpdated()}`, Data: doc }))
            .catch(e => res.status(500).json({ Error: true, Message: e }));
        }
      }
    }
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
            res.status(200).json({ Error: false, Data: usersList, authData });
          })
          .catch(error => res.status(500).json({ Error: true, Message: error }));
      }
    }
  });
});

/**
 *  delete a single user
 *  localhost:8080/users?employeeID=12345
 */
router.delete('/users/delete', verifyToken, (req, res) => {
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
        if (!req.query.employeeID) return res.status(400).json({ Error: true, Message: errorMsg.missingEmployeeID() });
        const targetID = req.query.employeeID;

        UsersModel.findOneAndDelete({ employeeID: targetID }, (error, user) => {
          if (error) {
            res.status(500).json({ Error: true, Message: error });
          } else if (user === null) {
            res.status(202).json({ Error: false, Message: grantMsg.noContent() });
          } else {
            res.status(202).json({ Error: false, Message: `${grantMsg.userDeleted()}`, Deleted_User: user });
          }
        });
      }
    }
  });
});

module.exports = router;

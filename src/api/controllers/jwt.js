/* eslint-disable no-use-before-define */
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./functions/verifyToken')

const jwtRequest = express();

jwtRequest.post('/api/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    userName: 'kelvin',
    email: 'kelvin@mail.test.com'
  };
  // asynchronous way , by default using HS256
  jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => {
    res.json({
      token
    });
  });
});

jwtRequest.post('/api/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});


module.exports = jwtRequest;

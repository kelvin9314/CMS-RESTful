/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const BooksModel = require('../models/books.model');
require('dotenv').config();

const router = express.Router();


/* eslint-disable consistent-return */
/* eslint-disable no-undef */
const express = require('express');
const createError = require('http-errors');
const BooksModel = require('../models/books.model');
require('dotenv').config();
// const verifyToken = require('./functions/verifyToken');
const checkAdmin = require('./functions/checkAdmin');
const errorMsg = require('../libs/errorMsg');
const grantMsg = require('../libs/grantMsg');
const { ValidDateBooksFormat } = require('../libs/joiCheck');

const router = express.Router();

/**
 * Create a new book information
 */
router.post('/create', async (req, res, next) => {
  const { authData } = req;
  const requesterID = authData.payload.employeeID;
  const requesterName = authData.payload.name;

  const checkObject = await checkAdmin(requesterID, requesterName);

  if (checkObject === null) {
    next(createError(403), errorMsg.permissionDenied());
  } else if (checkObject.isAdmin === true) {
    /* check the  data type */
    const { error } = ValidDateBooksFormat(req.body);
    if (error) return next(createError(400, error.details[0].message));

    /*  checking repetition for book's isbn   */
    let isExistsIsbn;
    if (req.body.isbn) {
      isExistsIsbn = await BooksModel.findOne({ isbn: req.body.isbn }).then(doc => {
        return doc !== null;
      });
    }
    if (isExistsIsbn) return next(createError(400, errorMsg.repeatedIsbn()));

    /*  checking repetition for book's title   */
    let isExistsTitle;
    if (req.body.title) {
      isExistsTitle = await BooksModel.findOne({ title: req.body.title }).then(doc => {
        return doc !== null;
      });
    }
    if (isExistsTitle) return next(createError(400, errorMsg.repeatedTitle()));

    /* generate the bookID by given book's genre */
    if (!req.body.bookID) {
      const targetGenre = req.body.genre.toUpperCase();
      const autoID = await BooksModel.where({ genre: targetGenre })
        .countDocuments()
        .then(num => {
          const tempNum = num + 1;
          const temnpIndex = num < 10 ? `0${tempNum}` : `${tempNum}`;
          return `${targetGenre}${temnpIndex}`;
        });
      req.body.bookID = autoID;
    }

    const model = new BooksModel(req.body);
    model.save().then(doc => {
      return !doc || doc.length === 0
        ? next(createError(500, doc))
        : res.status(201).json({ message: grantMsg.bookCreated() });
    });
  }
});

/**
 *  update information a single book
 *  PUT
 *  localhost:8080/users?bookID=DEV01
 */
router.put('/update', async (req, res) => {
  const { authData } = req;
  const requesterID = authData.payload.employeeID;
  const requesterName = authData.payload.name;

  const checkObject = await checkAdmin(requesterID, requesterName);

  if (checkObject === null) {
    next(createError(403, errorMsg.permissionDenied()));
  } else if (checkObject.isAdmin === true) {
    if (!req.query.bookID) return next(createError(400, errorMsg.missingBookID()));
    const targetID = req.query.bookID.toUpperCase();

    const { error } = ValidDateBooksUpdate(req.body);
    if (error) return next(createError(400, error.details[0].message));

    BooksModel.findOneAndUpdate({ bookID: targetID }, req.body, { new: true })
      .then(doc => res.status(202).json({ message: `${grantMsg.bookUpdated()}`, Data: doc }))
      .catch(e => next(createError(500, e)));
  }
});

/**
 *  Fetch all the book information without any filter
 */
router.get('/list', async (req, res) => {
  const { authData } = req;
  BooksModel.find({}).then(books => {
    res.status(200).json({ Data: books, authData });
  });
});

/**
 *  No need to delete book information , just changing the status of bool
 */

// router.delete('/delete', verifyToken, (req, res) => {
//   jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
//     if (err) {
//       res.status(403).json({ Error: true, Message: err });
//     } else {
//       const requesterID = authData.payload.employeeID;
//       const requesterName = authData.payload.name;

//       const checkObject = await checkAdmin(requesterID, requesterName);

//       if (checkObject === null) {
//         res.status(403).json({ Error: true, Message: errorMsg.permissionDenied() });
//       } else if (checkObject.isAdmin === true) {
//         if (!req.query.bookID) return res.status(400).json({ Error: true, Message: errorMsg.missingEmployeeID() });
//         const targetID = req.query.bookID.toUpperCase();

//         BooksModel.findOneAndDelete({ bookID: targetID }, (error, book) => {
//           if (error) {
//             res.status(500).json({ Error: true, Message: error });
//           } else if (book === null) {
//             res.status(202).json({ Error: false, Message: grantMsg.noContent() });
//           } else {
//             res.status(202).json({ Error: false, Message: `${grantMsg.bookDeleted()}`, Deleted_User: book });
//           }
//         });
//       }
//     }
//   });
// });

module.exports = router;

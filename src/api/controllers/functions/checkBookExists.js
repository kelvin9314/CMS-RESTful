const BooksModel = require('../../models/books.model');

/**
 * book 是否存在
 * @param {Syting} targetBookID 目標book的編號
 * @function
 * @returns true -> 該book 是存在 OR null -> 該 book 不存在
 */

module.exports = targetBookID => {
  const result = BooksModel.findOne({
    bookID: targetBookID
  }).lean();

  return result;
};

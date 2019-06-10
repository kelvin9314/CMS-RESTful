const mongoose = require('mongoose');

const remindsSchema = new mongoose.Schema({ remind: String });
const borrowersSchema = new mongoose.Schema({ name: String });

const booksSchema = new mongoose.Schema({
  bookID: {
    type: String, // 書籍編號 (自定義編碼，如果未來有ISBN碼就不用)
    trim: true,
    unique: true
  },
  isbn: {
    type: String, // 書籍ISBN碼
    unique: true,
    minlength: 13,
    maxlength: 13
    // required: true
  },
  title: {
    type: String, // 書名  (如果未來有ISBN碼就不用)
    required: true
  },
  author: {
    type: String // 作者  (如果未來有ISBN碼就不用)
  },
  yearOfPublication: {
    type: String, // 出版年份
    minlength: 4,
    maxlength: 4
  },
  dateOfEntry: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Free', 'Occupied', 'Disable'],
    default: 'Free'
  },
  genre: {
    type: String, // 上架類別
    uppercase: true,
    trim: true,
    minlength: 3,
    maxlength: 3,
    enum: ['UCD', 'DEV', 'MNG', 'ENT', 'COD', 'MAG']
  },
  donner: {
    type: String // 捐贈者
  },
  remind: {
    type: [remindsSchema]
  },

  totalQuantity: {
    type: Number, // 書籍數量
    default: 1,
    required: true
  },
  availableQuantity: {
    type: Number, // 書籍目前可借用數量
    default: 1,
    required: true
  },
  currentBorrowerId: {
    type: [borrowersSchema] // this data only visible by Admin
  }
});

module.exports = mongoose.model('Books', booksSchema);

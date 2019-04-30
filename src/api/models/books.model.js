const mongoose = require('mongoose');

const remindsSchema = new mongoose.Schema({ remind: String });
const borrowersSchema = new mongoose.Schema({ name: String });

const booksSchema = new mongoose.Schema({
  bookID: {
    type: String, // 書籍編號 (自定義編碼，如果未來有ISBN碼就不用)
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    minlength: 13,
    maxlength: 13,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  yearOfPublication: {
    type: String // 出版年份
  },
  status: {
    type: String,
    enum: ['Free', 'Occupied', 'Disable'],
    default: 'Free'
  },
  genre: {
    type: String,
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
    type: [remindsSchema],
    default: undefined
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

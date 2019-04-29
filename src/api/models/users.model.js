const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  /* 員工編號 */
  employeeID: {
    type: String,
    required: true,
    index: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 5
  },
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 72 // BCrypt is limited to 72 bytes
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

usersSchema.set('autoIndex', false);

module.exports = mongoose.model('Users', usersSchema);

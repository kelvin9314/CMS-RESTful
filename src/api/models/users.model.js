const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  employeeID: {
    type: String, // 員工編號
    index: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 5,
    required: true
  },
  name: {
    type: String,
    lowercase: true,
    unique: true,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 72, // BCrypt is limited to 72 bytes
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// usersSchema.set('autoIndex', false);

module.exports = mongoose.model('Users', usersSchema);

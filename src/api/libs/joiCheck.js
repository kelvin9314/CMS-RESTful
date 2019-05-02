/* eslint-disable no-undef */
const Joi = require('@hapi/joi');

ValidDateBooksFormat = booksData => {
  const schema = Joi.object().keys({
    bookID: Joi.string()
      .regex(/^[a-zA-Z0-9-]{5,10}$/)
      .trim(),
    // required(),
    isbn: Joi.string()
      .regex(/^[0-9]{13,13}$/)
      .trim(),
    // required(),
    title: Joi.string().required(),
    author: Joi.string(),
    yearOfPublication: Joi.string()
      .min(4)
      .max(4)
      .trim(),
    dateOfEntry: Joi.date()
      .min('2016-01-01')
      .max('now')
      .required(),
    status: Joi.string().valid('Free', 'Occupied', 'Disable'),
    genre: Joi.string()
      .uppercase()
      .trim()
      .min(3)
      .max(3)
      .valid('UCD', 'DEV', 'MNG', 'ENT', 'COD', 'MAG')
      .required(),
    donner: Joi.string(),
    remind: Joi.array().items(Joi.string()),
    totalQuantity: Joi.number()
      .integer()
      .positive()
      .required(),
    availableQuantity: Joi.number()
      .integer()
      .positive()
      .required(),
    currentBorrowerId: Joi.array().items(Joi.string())
  });

  const result = Joi.validate(booksData, schema);

  return result;
};

ValidDateBooksUpdate = booksData => {
  const schema = Joi.object().keys({
    bookID: Joi.string()
      .regex(/^[a-zA-Z0-9-]{5,10}$/)
      .trim(),
    // required(),
    isbn: Joi.string()
      .regex(/^[0-9]{13,13}$/)
      .trim(),
    // required(),
    title: Joi.string(),
    author: Joi.string(),
    yearOfPublication: Joi.string()
      .min(4)
      .max(4)
      .trim(),
    dateOfEntry: Joi.date()
      .min('2016-01-01')
      .max('now'),

    status: Joi.string().valid('Free', 'Occupied', 'Disable'),
    genre: Joi.string()
      .uppercase()
      .trim()
      .min(3)
      .max(3)
      .valid('UCD', 'DEV', 'MNG', 'ENT', 'COD', 'MAG'),
    donner: Joi.string(),
    remind: Joi.array().items(Joi.string()),
    totalQuantity: Joi.number()
      .integer()
      .positive(),
    availableQuantity: Joi.number()
      .integer()
      .positive(),
    currentBorrowerId: Joi.array().items(Joi.string())
  });

  const result = Joi.validate(booksData, schema);

  return result;
};

validDateUsersFormat = accountData => {
  const schema = Joi.object().keys({
    employeeID: Joi.string()
      .regex(/^[0-9]{5,5}$/)
      .required(),
    name: Joi.string()
      .lowercase()
      .max(30)
      .trim()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{8,72}$/)
      .required(),
    isAdmin: Joi.boolean()
  });

  const result = Joi.validate(accountData, schema);

  return result;
};

validDateUsersUpdate = accountData => {
  const schema = Joi.object().keys({
    employeeID: Joi.string()
      .regex(/^[0-9]{5,5}$/),
    name: Joi.string()
      .lowercase()
      .max(30)
      .trim(),
    email: Joi.string()
      .email({ minDomainSegments: 2 }),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{8,72}$/),
    isAdmin: Joi.boolean()
  });

  const result = Joi.validate(accountData, schema);

  return result;
};

validDateLoginFormat = loginData => {
  const schema = Joi.object().keys({
    employeeID: Joi.string()
      .alphanum()
      .length(5)
      .trim()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9_]{8,72}$/)
      .required()
  });

  const result = Joi.validate(loginData, schema);

  return result;
};

module.exports.ValidDateBooksFormat = ValidDateBooksFormat;
module.exports.validDateUsersFormat = validDateUsersFormat;
module.exports.validDateLoginFormat = validDateLoginFormat;
module.exports.ValidDateBooksUpdate = ValidDateBooksUpdate;
module.exports.validDateUsersUpdate = validDateUsersUpdate;

/**
 * Error message for different situations
 * @exports errorMsg
 */

const repeatedID = () => {
  return 'EmployeeID is repeated';
};

const repeatedName = () => {
  return 'name is repeated';
};

const repeatedEmail = () => {
  return 'email is repeated';
};

const loginFailure = () => {
  return 'Incorrect with employeeID or password !.!';
};

const permissionDenied = () => {
  return 'You do not have the permission to access the requested resource !.!';
};

const missingEmployeeID = () => {
  return 'Missing employeeID , e.g. ...?employeeID=12345';
};

const urlNotFound = () => {
  return 'We think you are lost';
};

const repeatedIsbn = () => {
  return 'Book isbn is repeated';
};

const repeatedTitle = () => {
  return 'Book title is repeated or this book is exists';
};

const missingBookID = () => {
  return 'Missing bookId,e.g ...?bookID=DEV01';
};

module.exports = {
  repeatedID,
  repeatedName,
  repeatedEmail,
  loginFailure,
  permissionDenied,
  missingEmployeeID,
  urlNotFound,
  repeatedIsbn,
  repeatedTitle,
  missingBookID
};

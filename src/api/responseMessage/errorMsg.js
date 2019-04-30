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
module.exports.repeatedID = repeatedID;
module.exports.repeatedName = repeatedName;
module.exports.repeatedEmail = repeatedEmail;
module.exports.loginFailure = loginFailure;
module.exports.permissionDenied = permissionDenied;

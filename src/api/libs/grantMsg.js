/**
 * Grant message for different situations
 * @exports grantMsg
 */

const accountCreated = () => {
  return 'Account Created';
};

const loginSuccessful = () => {
  return 'Login successful';
};

const userDeleted = () => {
  return 'User Deleted';
};

const noContent = () => {
  return 'Target is not exist';
};

const bookCreated = () => {
  return 'Book created';
};

const bookUpdated = () => {
  return 'Book Updated';
};

const userUpdated = () => {
  return 'User Updated';
};

const bookDeleted = () => {
  return 'User Deleted';
};

module.exports = {
  accountCreated,
  loginSuccessful,
  userDeleted,
  noContent,
  bookCreated,
  bookUpdated,
  userUpdated,
  bookDeleted
};

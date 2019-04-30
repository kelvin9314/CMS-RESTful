const UsersModel = require('../../models/users.model');

function checkAdmin(requesterID, requesterName) {
  const result = UsersModel.findOne({
    employeeID: requesterID,
    name: requesterName,
    isAdmin: true
  }).lean();

  return result;
}

module.exports = checkAdmin;

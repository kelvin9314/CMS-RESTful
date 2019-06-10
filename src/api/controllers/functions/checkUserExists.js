const UsersModel = require('../../models/users.model');

/**
 * 檢查user 是否存在
 * @param {Syting} requesterID 登入者員工編號
 * @function
 * @returns true -> 該user 是存在 OR null -> 該user 不存在
 */

module.exports = requesterID => {
  const result = UsersModel.findOne({
    employeeID: requesterID
  }).lean();

  return result;
};

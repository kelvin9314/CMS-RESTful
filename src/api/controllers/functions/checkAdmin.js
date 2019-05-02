const UsersModel = require('../../models/users.model');

/**
 * 檢查call 這個api 的user 是不是admin
 * p.s. 部份 api 只允許admin 執行
 *
 * @param {Syting} requesterID 登入者員工編號
 * @param {String} requesterName 登入者姓名
 * @function
 * @returns true -> 該user 是admin OR null -> 該user 不是admin
 */
function checkAdmin(requesterID, requesterName) {
  const result = UsersModel.findOne({
    employeeID: requesterID,
    name: requesterName,
    isAdmin: true
  }).lean();

  return result;
}

module.exports = checkAdmin;

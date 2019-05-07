/**
 * Verify Json Web Token is exists in headers or not.
 * Format of Token -> headers.Authorization: Bearer <access_token>.
 *
 * @param  {} req request
 * @param  {} res response
 * @param  {} next
 * @function
 *
 * @returns
 * req.token
 * or
 * Error 403
 */
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const JWT_SECRET = process.env.SECRET_KEY;

const decodeJwt = async token => {
  try {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, data) => {
        if (err) reject(err);
        return resolve(data);
      });
    });
  } catch (err) {
    throw createError(403, 'Token Invalid');
  }
};

module.exports = async (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  try {
    let Bearer;
    // Check if bearer is undefined
    if (typeof bearerHeader === 'undefined') throw createError(401, 'Incorrect token format');
    // Set the token
    [Bearer, req.token] = bearerHeader.split(' ');

    if (Bearer !== 'Bearer') throw createError(401, 'Incorrect token format ');
    // Next middleware
    req.authData = await decodeJwt(req.token);
    next();
  } catch (err) {
    next(err);
  }
};

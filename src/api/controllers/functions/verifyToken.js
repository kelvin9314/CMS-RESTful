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

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).send({ Error: true, Message: 'Missing Bearer in headers.authorization' });
    // res.status(403);
  }
}

module.exports = verifyToken;

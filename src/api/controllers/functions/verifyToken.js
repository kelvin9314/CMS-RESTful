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
    const CheckToken = new Promise((resolve, reject) => {
      jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) reject(err);
        return resolve(authData);
      });
    });

    CheckToken.then(value => {
      req.authData = value;
      next();
    }).catch(() => res.status(403).send({ Error: true, Message: 'Token invalid' }));
  } else {
    // Forbidden
    res.status(403).send({ Error: true, Message: 'Missing Bearer in headers.authorization' });
    // res.status(403);
  }
}

module.exports = verifyToken;

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if ( !token ) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
    if ( err ) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const generateAccessToken = user => jwt.sign(
    user, 
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: '15s' }
);

module.exports = {
  generateAccessToken,
  authenticateToken
};

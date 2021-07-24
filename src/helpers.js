const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });

const connectToMongoDB = () => {
  const mongoose = require('mongoose');

  mongoose.connect(
    'mongodb://127.0.0.1:27017/etb',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log('db connected'),
  );
};

module.exports = {
  generateAccessToken,
  authenticateToken,
  connectToMongoDB,
};

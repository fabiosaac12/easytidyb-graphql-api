require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const { generateAccessToken, connectToMongoDB } = require('./helpers.js');
const { User } = require('./models');

const app = express();
app.use(express.json());

connectToMongoDB();

let refreshTokens = [];

app.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ username: user.username });

    res.json({ accessToken: newAccessToken });
  });
})

app.post('/login', (req, res) => {
  const user = req.body;

  User.find(user)
    .then(([user]) => {
      if (!user) return res.sendStatus(401);

      const { username } = user;
      const accessToken = generateAccessToken({ username });
      const refreshToken = jwt.sign(
        { username }, 
        process.env.ACCESS_TOKEN_SECRET
      );

      refreshTokens.push(refreshToken);

      res.json({ accessToken, refreshToken });
    })
    .catch(() => res.sendStatus(503));
})

app.delete('/logout', (req, res) => {
  const refreshToken = req.body.refreshToken;
  refreshTokens = refreshTokens.filter(t => t !== refreshToken);
  res.sendStatus(204);
})

app.listen(4001, () => console.log('auth server in port 4001'))

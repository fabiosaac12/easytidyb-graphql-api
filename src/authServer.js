require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');

const { generateAccessToken } = require('./helpers.js');

const username = "fabiosaac";

const app = express();
app.use( express.json() );

let refreshTokens = [];

app.post('/refreshToken', ( req, res ) => {
    const refreshToken = req.body.refreshToken;
    if ( !refreshToken ) return res.sendStatus(401);
    if ( !refreshTokens.includes( refreshToken ) ) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, ( err, user ) => {
	if ( err ) return res.sendStatus(403);
	const newAccessToken = generateAccessToken({ username: user.username });
	res.json({ accessToken: newAccessToken })
    })
})

app.post('/login', ( req, res ) => {
    const reqUsername = req.body.username
    if (reqUsername === username) {
	const accessToken = generateAccessToken({ username: reqUsername });
	const refreshToken = jwt.sign(
	    { username: reqUsername }, 
	    process.env.ACCESS_TOKEN_SECRET
	);
	refreshTokens.push( refreshToken );
	return res.json({ accessToken, refreshToken });
    }
    res.sendStatus(401)
})

app.delete('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter( t => t !== refreshToken );
    res.sendStatus(204)
})

app.listen(4001, () => console.log('auth server in port 4001'))

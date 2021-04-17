require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');
const { authenticateToken, connectToMongoDB } = require('./helpers.js');

const app = express();

app.use(cors());
app.use(authenticateToken);

connectToMongoDB();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(4000, () => console.log('server in port 4000'))

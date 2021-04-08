require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema');
const { authenticateToken } = require('./helpers.js');

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb://127.0.0.1:27017/etb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('db connected')

)

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(4000, () => console.log('server in port 4000'))

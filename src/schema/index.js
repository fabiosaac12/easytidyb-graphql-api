const { GraphQLSchema } = require('graphql');

const RootQuery = require('./RootQuery.js');
const Mutation = require('./Mutation.js');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

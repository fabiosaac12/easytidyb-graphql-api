const { GraphQLObjectType } = require('graphql');

const {
  UserQueryFields,
  SupplierQueryFields,
  OrderQueryFields,
  ProductQueryFields,
  ClientQueryFields,
  SaleQueryFields
} = require('./types');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...UserQueryFields,
    ...SupplierQueryFields,
    ...OrderQueryFields,
    ...ProductQueryFields,
    ...ClientQueryFields,
    ...SaleQueryFields
  }
});

module.exports = RootQuery;

const { GraphQLObjectType } = require('graphql');

const {
  UserMutationFields,
  SupplierMutationFields,
  OrderMutationFields,
  ProductMutationFields,
  ClientMutationFields,
  SaleMutationFields
} = require('./types');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutationFields,
    ...SupplierMutationFields,
    ...OrderMutationFields,
    ...ProductMutationFields,
    ...ClientMutationFields,
    ...SaleMutationFields
  }
});

module.exports = Mutation;

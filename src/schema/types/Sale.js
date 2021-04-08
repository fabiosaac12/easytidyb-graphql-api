const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const GraphQLLong = require('graphql-type-long');
const { Sale } = require('../../models');

const SaleType = new GraphQLObjectType({
  name: 'Sale',
  fields: () => ({
    _id: { type: GraphQLID },
    productId: { type: GraphQLID },
    clientId: { type: GraphQLID },
    quantity: { type: GraphQLInt },
    obtained: { type: GraphQLInt },
    profit: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    type: { type: GraphQLString },
    date: { type: GraphQLLong }
  })
});

const SaleQueryFields = {
  sales: {
    type: new GraphQLList(SaleType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Sale.find({ userId: args.userId})
    }
  }
};

const SaleMutationFields = {
  addSale: {
    type: SaleType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      productId: { type: new GraphQLNonNull(GraphQLID) },
      clientId: { type: new GraphQLNonNull(GraphQLID) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      obtained: { type: new GraphQLNonNull(GraphQLInt) },
      profit: { type: new GraphQLNonNull(GraphQLInt) },
      discount: { type: new GraphQLNonNull(GraphQLInt) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLLong) }
    },
    resolve(_, args) {
      const newSale = new Sale({
        userId: args.userId,
        productId: args.productId,
        clientId: args.clientId,
        quantity: args.quantity,
        obtained: args.obtained,
        profit: args.obtained,
        discount: args.discount,
        type: args.type,
        date: args.date 
      });

      return newSale.save();
    }
  }
};

module.exports = {
  SaleQueryFields,
  SaleMutationFields,
  SaleType
};

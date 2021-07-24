const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const {
  UserType,
  SupplierType,
  OrderType,
  ProductType,
  ClientType,
  SaleType,
} = require('./types');
const { User, Supplier, Order, Product, Client, Sale } = require('../models');

const UserQueryFields = {
  users: {
    type: new GraphQLList(UserType),
    resolve() {
      return User.find({});
    },
  },
};

const SupplierQueryFields = {
  suppliers: {
    type: new GraphQLList(SupplierType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Supplier.find({ userId: args.userId });
    },
  },
};

const OrderQueryFields = {
  orders: {
    type: new GraphQLList(OrderType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Order.find({ userId: args.userId });
    },
  },
};

const ProductQueryFields = {
  products: {
    type: new GraphQLList(ProductType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Product.find({ userId: args.userId });
    },
  },
};

const ClientQueryFields = {
  clients: {
    type: new GraphQLList(ClientType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Client.find({ userId: args.userId });
    },
  },
};

const SaleQueryFields = {
  sales: {
    type: new GraphQLList(SaleType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Sale.find({ userId: args.userId });
    },
  },
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...UserQueryFields,
    ...SupplierQueryFields,
    ...OrderQueryFields,
    ...ProductQueryFields,
    ...ClientQueryFields,
    ...SaleQueryFields,
  },
});

module.exports = RootQuery;

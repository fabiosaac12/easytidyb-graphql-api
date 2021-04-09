const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');
const GraphQLLong = require('graphql-type-long');
const {
  UserType,
  SupplierType,
  OrderType,
  ProductType,
  ClientType,
  SaleType
} = require('./types');
const { User, Supplier, Order, Product, Client, Sale } = require('../models');

const UserMutationFields = {
  addUser: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(_, args) {
      const newUser = new User(args);

      return newUser.save();
    }
  },
};

const SupplierMutationFields = {
  addSupplier: {
    type: SupplierType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString }
    },
    resolve(_, args) {
      const newSupplier = new Supplier(args);

      return newSupplier.save();
    }
  }
};

const OrderMutationFields = {
  addOrder: {
    type: OrderType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      supplierId: { type: new GraphQLNonNull(GraphQLID) },
      expectedObtained: { type: new GraphQLNonNull(GraphQLInt) },
      date: { type: new GraphQLNonNull(GraphQLLong) }
    },
    resolve(_, args) {
      const newOrder = new Order(args);

      return newOrder.save();
    }
  }
};

const ProductMutationFields = {
  addProduct: {
    type: ProductType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      orderId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      char1: { type: GraphQLString },
      char2: { type: GraphQLString },
      initialStock: { type: new GraphQLNonNull(GraphQLInt) },
      retailPrice: { type: new GraphQLNonNull(GraphQLInt) },
      wholesalePrice: { type: new GraphQLNonNull(GraphQLInt) },
      purchasePrice: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(_, args) {
      const newProduct = new Product(args);

      return newProduct.save();
    }
  }
};

const ClientMutationFields = {
  addClient: {
    type: ClientType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString }
    },
    resolve(_, args) {
      const newClient = new Client(args);

      return newClient.save();
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
      const newSale = new Sale(args);

      return newSale.save();
    }
  }
};

const RootMutation = new GraphQLObjectType({
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

module.exports = RootMutation;

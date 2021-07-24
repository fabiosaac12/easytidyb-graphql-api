const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');
const GraphQLLong = require('graphql-type-long');
const {
  UserType,
  SupplierType,
  OrderType,
  ProductType,
  ClientType,
  SaleType,
} = require('./types');
const { User, Supplier, Order, Product, Client, Sale } = require('../models');

const UserMutationFields = {
  addUser: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_, args) {
      const newUser = new User(args);

      return newUser.save();
    },
  },
  updateUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_, args) {
      const updatedUser = User.findByIdAndUpdate(args._id, args);

      return updatedUser.exec();
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedUser = User.findByIdAndRemove(args._id);

      return deletedUser.exec();
    },
  },
};

const SupplierMutationFields = {
  addSupplier: {
    type: SupplierType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(_, args) {
      const newSupplier = new Supplier(args);

      return newSupplier.save();
    },
  },
  updateSupplier: {
    type: SupplierType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(_, args) {
      const updatedSupplier = Supplier.findByIdAndUpdate(args._id, args, {
        new: true,
      });

      return updatedSupplier.exec();
    },
  },
  deleteSupplier: {
    type: SupplierType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedSupplier = Supplier.findByIdAndRemove(args._id);

      return deletedSupplier.exec();
    },
  },
};

const OrderMutationFields = {
  addOrder: {
    type: OrderType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      supplierId: { type: new GraphQLNonNull(GraphQLID) },
      expectedObtained: { type: new GraphQLNonNull(GraphQLInt) },
      date: { type: new GraphQLNonNull(GraphQLLong) },
    },
    resolve(_, args) {
      const newOrder = new Order(args);

      return newOrder.save();
    },
  },
  updateOrder: {
    type: OrderType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      supplierId: { type: new GraphQLNonNull(GraphQLID) },
      expectedObtained: { type: new GraphQLNonNull(GraphQLInt) },
      date: { type: new GraphQLNonNull(GraphQLLong) },
    },
    resolve(_, args) {
      const updatedOrder = Order.findByIdAndUpdate(args._id, args);

      return updatedOrder.exec();
    },
  },
  deleteOrder: {
    type: OrderType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedOrder = Order.findByIdAndRemove(args._id);

      return deletedOrder.exec();
    },
  },
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
      purchasePrice: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_, args) {
      const newProduct = new Product(args);

      return newProduct.save();
    },
  },
  updateProduct: {
    type: ProductType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      orderId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      char1: { type: GraphQLString },
      char2: { type: GraphQLString },
      initialStock: { type: new GraphQLNonNull(GraphQLInt) },
      retailPrice: { type: new GraphQLNonNull(GraphQLInt) },
      wholesalePrice: { type: new GraphQLNonNull(GraphQLInt) },
      purchasePrice: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(_, args) {
      const updatedProduct = Product.findByIdAndUpdate(args._id, args);

      return updatedProduct.exec();
    },
  },
  deleteProduct: {
    type: ProductType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedProduct = Product.findByIdAndRemove(args._id);

      return deletedProduct.exec();
    },
  },
};

const ClientMutationFields = {
  addClient: {
    type: ClientType,
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(_, args) {
      const newClient = new Client(args);

      return newClient.save();
    },
  },
  updateClient: {
    type: ClientType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      location: { type: GraphQLString },
      contact: { type: GraphQLString },
    },
    resolve(_, args) {
      const updatedClient = Client.findByIdAndUpdate(args._id, args);

      return updatedClient.exec();
    },
  },
  deleteClient: {
    type: ClientType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedClient = Client.findByIdAndRemove(args._id);

      return deletedClient.exec();
    },
  },
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
      date: { type: new GraphQLNonNull(GraphQLLong) },
    },
    resolve(_, args) {
      const newSale = new Sale(args);

      return newSale.save();
    },
  },
  updateSale: {
    type: SaleType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
      productId: { type: new GraphQLNonNull(GraphQLID) },
      clientId: { type: new GraphQLNonNull(GraphQLID) },
      quantity: { type: new GraphQLNonNull(GraphQLInt) },
      obtained: { type: new GraphQLNonNull(GraphQLInt) },
      profit: { type: new GraphQLNonNull(GraphQLInt) },
      discount: { type: new GraphQLNonNull(GraphQLInt) },
      type: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: new GraphQLNonNull(GraphQLLong) },
    },
    resolve(_, args) {
      const updatedSale = Sale.findByIdAndUpdate(args._id, args);

      return updatedSale.exec();
    },
  },
  deleteSale: {
    type: SaleType,
    args: {
      _id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      const deletedSale = Sale.findByIdAndRemove(args._id);

      return deletedSale.exec();
    },
  },
};

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutationFields,
    ...SupplierMutationFields,
    ...OrderMutationFields,
    ...ProductMutationFields,
    ...ClientMutationFields,
    ...SaleMutationFields,
  },
});

module.exports = RootMutation;

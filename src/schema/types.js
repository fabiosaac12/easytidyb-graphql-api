const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const GraphQLLong = require('graphql-type-long');
const { Supplier, Order, Product, Client, Sale } = require('../models');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const SupplierType = new GraphQLObjectType({
  name: 'Supplier',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    contact: { type: GraphQLString },
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent) {
        return Order.find({ supplierId: parent._id });
      }
    }
  })
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: { type: GraphQLID },
    supplierId: { type: GraphQLID },
    supplier: {
      type: SupplierType,
      resolve(parent) {
        return Supplier.findById(parent.supplierId);
      }
    },
    expectedObtained: { type: GraphQLInt },
    date: { type: GraphQLLong },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent) {
        return Product.find({ orderId: parent._id });
      }
    }
  })
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    _id: { type: GraphQLID },
    orderId: { type: GraphQLID },
    order: {
      type: OrderType,
      resolve(parent) {
        return Order.findById(parent.orderId);
      }
    },
    name: { type: GraphQLString },
    char1: { type: GraphQLString },
    char2: { type: GraphQLString },
    initialStock: { type: GraphQLInt },
    retailPrice: { type: GraphQLInt },
    wholesalePrice: { type: GraphQLInt },
    purchasePrice: { type: GraphQLInt },
    sales: {
      type: new GraphQLList(SaleType),
      resolve(parent) {
        return Sale.find({ productId: parent._id });
      }
    }
  })
});

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    contact: { type: GraphQLString },
    sales: {
      type: new GraphQLList(SaleType),
      resolve(parent) {
        return Sale.find({ clientId: parent._id });
      }
    }
  })
});

const SaleType = new GraphQLObjectType({
  name: 'Sale',
  fields: () => ({
    _id: { type: GraphQLID },
    productId: { type: GraphQLID },
    product: {
      type: ProductType,
      resolve(parent) {
        return Product.findById(parent.productId);
      }
    },
    clientId: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId);
      }
    },
    quantity: { type: GraphQLInt },
    obtained: { type: GraphQLInt },
    profit: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    type: { type: GraphQLString },
    date: { type: GraphQLLong }
  })
});

module.exports = {
  UserType,
  SupplierType,
  OrderType,
  ProductType,
  ClientType,
  SaleType
};

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const GraphQLLong = require('graphql-type-long');
const { ProductType } = require('./Product.js');
const { Order, Product, Supplier } = require('../../models');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    _id: { type: GraphQLID },
    supplierId: { type: GraphQLID },
    // supplier: {
    //   type: SupplierType,
    //   resolve(parent) {
    //     return Supplier.findById(parent.supplierId);
    //   }
    // },
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

const OrderQueryFields = {
  orders: {
    type: new GraphQLList(OrderType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Order.find({ userId: args.userId});
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
      const newOrder = new Order({
        userId: args.userId,
        supplierId: args.supplierId,
        expectedObtained: args.expectedObtained,
        date: args.date,
      });

      return newOrder.save();
    }
  }
};

module.exports = {
  OrderQueryFields,
  OrderMutationFields,
  OrderType
};

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const { OrderType } = require('./Order.js');
const { Supplier, Order } = require('../../models');

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

const SupplierQueryFields = {
  suppliers: {
    type: new GraphQLList(SupplierType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Supplier.find({ userId: args.userId});
    }
  }
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
      const newSupplier = new Supplier({
        userId: args.userId,
        name: args.name,
        location: args.location,
        contact: args.contact,
      });

      return newSupplier.save();
    }
  }
};

module.exports = {
  SupplierQueryFields,
  SupplierMutationFields,
  SupplierType
};

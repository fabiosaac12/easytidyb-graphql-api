const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const { SaleType } = require('./Sale');
const { Client, Sale } = require('../../models');

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
        return Sale.find({ productId: parent._id });
      }
    }
  })
});

const ClientQueryFields = {
  clients: {
    type: new GraphQLList(ClientType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Client.find({ userId: args.userId})
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
      const newClient = new Client({
        userId: args.userId,
        name: args.name,
        location: args.location,
        contact: args.contact,
      });

      return newClient.save();
    }
  }
};

module.exports = {
  ClientQueryFields,
  ClientMutationFields,
  ClientType
};

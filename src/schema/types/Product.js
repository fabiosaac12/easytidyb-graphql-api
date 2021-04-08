const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const { SaleType } = require('./Sale');
const { Product, Sale } = require('../../models');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    _id: { type: GraphQLID },
    orderId: { type: GraphQLID },
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

const ProductQueryFields = {
  products: {
    type: new GraphQLList(ProductType),
    args: {
      userId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(_, args) {
      return Product.find({ userId: args.userId});
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
      const newProduct = new Product({
        userId: args.userId,
        orderId: args.orderId,
        name: args.name,
        char1: args.char1,
        char2: args.char2,
        initialStock: args.initialStock,
        retailPrice: args.retailPrice,
        wholesalePrice: args.wholesalePrice,
        purchasePrice: args.purchasePrice 
      });

      return newProduct.save();
    }
  }
};

module.exports = {
  ProductQueryFields,
  ProductMutationFields,
  ProductType
};

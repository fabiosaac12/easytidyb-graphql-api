const {
  UserMutationFields,
  UserQueryFields
} = require('./User.js');

const {
  SupplierMutationFields,
  SupplierQueryFields,
  SupplierType
} = require('./Supplier.js');

const {
  OrderMutationFields,
  OrderQueryFields,
  OrderType,
} = require('./Order.js');

const {
  ProductMutationFields,
  ProductQueryFields,
  ProductType
} = require('./Product.js');

const {
  ClientMutationFields,
  ClientQueryFields,
  ClientType
} = require('./Client.js');

const {
  SaleMutationFields,
  SaleQueryFields,
  SaleType
} = require('./Sale.js');

module.exports = {
  UserMutationFields,
  UserQueryFields,
  SupplierMutationFields,
  SupplierQueryFields,
  SupplierType,
  OrderMutationFields,
  OrderQueryFields,
  OrderType,
  ProductMutationFields,
  ProductQueryFields,
  ProductType,
  ClientMutationFields,
  ClientQueryFields,
  ClientType,
  SaleMutationFields,
  SaleQueryFields,
  SaleType
};

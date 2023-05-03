const { gql } = require("apollo-server-express");
const { userTypeDefs, userResolvers } = require("./user");
const { productTypeDefs, productResolvers } = require("./product");
const { cartTypeDefs, cartResolvers } = require("./cart");
const { favoriteTypeDefs, favoriteResolvers } = require("./favorite");
const { petTypeDefs, petResolvers } = require("./pet");
// const { PetTypeTypeDefs, PetTypeResolvers } = require("./petType");
const { provinceTypeDefs, provinceResolvers } = require("./province");
const { locationTypeDefs, locationResolvers } = require("./location");
const { addressTypeDefs, addressResolvers } = require("./address");
const { serviceTypeDefs, serviceResolvers } = require("./service");
const { productBuyTypeDefs, productBuyResolvers } = require("./productBuy");
const { productCartTypeDefs, productCartResolvers } = require("./productCart");
const { commentTypeDefs, commentResolvers} = require('./comment');
const {shipmentTypeDefs, shipmentResolvers} = require('./shipment');
const { productFavoriteTypeDefs, productFavoriteResolvers } = require('./productFavorite')
const { buyTypeDefs, buyResolvers } = require('./buy')
const { servicePetTypeDefs, servicePetResolvers } = require('./servicePet')

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  productTypeDefs,
  cartTypeDefs,
  favoriteTypeDefs,
  petTypeDefs,
  // PetTypeTypeDefs,
  provinceTypeDefs,
  locationTypeDefs,
  addressTypeDefs,
  serviceTypeDefs,
  productBuyTypeDefs,
  productCartTypeDefs,
  commentTypeDefs,
  shipmentTypeDefs,
  productFavoriteTypeDefs,
  buyTypeDefs,
  servicePetTypeDefs
];

const resolvers = [
  userResolvers,
  productResolvers,
  cartResolvers,
  favoriteResolvers,
  petResolvers,
  // PetTypeResolvers,
  provinceResolvers,
  locationResolvers,
  addressResolvers,
  serviceResolvers,
  productBuyResolvers,
  productCartResolvers,
  commentResolvers,
  shipmentResolvers,
  productFavoriteResolvers,
  buyResolvers,
  servicePetResolvers
];

module.exports = {
  typeDefs,
  resolvers,
};

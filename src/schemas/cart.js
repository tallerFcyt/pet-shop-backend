const { gql } = require("apollo-server-express");
const { Cart } = require('../models/Cart');

const cartTypeDefs = gql`
  extend type Query {
    getCart(user_id: String!): Cart
  }

  type Cart {
    id: Int!
    user_id: String!
  }
`;

const cartResolvers = {
  Query: {
    async getCart(root, { user_id }) {
      return await Cart.findOne({where:{user_id: user_id}});
    }
  }
}
module.exports = {
  cartTypeDefs,
  cartResolvers
};

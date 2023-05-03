const { gql } = require("apollo-server-express");
const { Favorite } = require('../models/Favorite');

const favoriteTypeDefs = gql`
  extend type Query {
    getFavorite(user_id: String!): Favorite
  }

  type Favorite {
    id: Int!
    user_id: String!
  }
`;

const favoriteResolvers = {
  Query: {
    async getFavorite(root, { user_id }) {
      return await Favorite.findOne({where:{user_id: user_id}});
    }
  }
}

module.exports = {
  favoriteTypeDefs,
  favoriteResolvers
};

const { gql } = require("apollo-server-express");
const { Location } = require('../models/Location');

const locationTypeDefs = gql`
  extend type Query {
    getLocation(id: ID!): Location
    getAllLocation(province_id: Int!): [Location]
  }

  type Location {
    id: Int!
    name: String!
  }
`;

const locationResolvers = {
  Query: {
    async getLocation(root, { id }) {
      return Location.findByPk(id);
    },
    async getAllLocation(root, {province_id}) {
      return Location.findAll({where: {province_id: province_id}});
    },
  }
}

module.exports = {
  locationTypeDefs,
  locationResolvers
};
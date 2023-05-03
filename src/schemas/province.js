const { gql } = require("apollo-server-express");
const { Province } = require("../models/Province");

const provinceTypeDefs = gql`
  extend type Query {
    getProvince(id: ID!): Province
    getAllProvince: [Province]
  }

  type Province {
    id: Int!
    name: String!
  }
`;

const provinceResolvers = {
  Query: {
    async getProvince(root, { id }) {
      return Province.findByPk(id);
    },
    async getAllProvince(root) {
      return Province.findAll();
    },
  },
};

module.exports = {
  provinceTypeDefs,
  provinceResolvers,
};

const { gql } = require("apollo-server-express");
const { Buy } = require("../models/Buy");
const { Shipment } = require("../models/Shipment");
const { User } = require("../models/User");

const buyTypeDefs = gql`
  extend type Query {
    getBuy(id: ID!): Buy
    getAllBuys: [Buy]
  }

  extend type Mutation {
    createBuy(
      id: String!
      totalPrice: Float!
      user_id: String!
      address_id: Int!
    ): String
  }

  scalar DateTime
  type Buy {
    id: String!
    totalPrice: Float!
    user_id: String!
    address_id: Int!
    createdAt: DateTime
    shipment: Shipment
    user: User
  }
`;

const buyResolvers = {
  Query: {
    async getBuy(root, { id }) {
      return Buy.findByPk(id);
    },
    async getAllBuys(root) {
      return Buy.findAll();
    },
  },

  Mutation: {
    createBuy: async (root, { id, totalPrice, user_id, address_id }) => {
      try {
        await Buy.create({
          id,
          totalPrice,
          user_id,
          address_id 
        });
        return "Compra creada con exito";
      } catch (error) {
        return error.message;
      }
    },

  },
  Buy: {
    shipment: ({id}) => {
      return Shipment.findOne({where: {buy_id: id}})
    },
    user: ({user_id}) => {
      return User.findByPk(user_id)
    }
  }
};

module.exports = {
  buyTypeDefs,
  buyResolvers,
};
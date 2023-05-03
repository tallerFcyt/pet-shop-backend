const { gql } = require("apollo-server-express");
const { Address } = require("../models/Address");

const addressTypeDefs = gql`
  extend type Query {
    getAddress(id: ID!): Address
    getAllAddress: [Address]
  }

  extend type Mutation {
    createAddress(
      street_name: String!
      house_number: Int!
    ): String
    updateAddress(
      id: Int!
      street_name: String
      house_number: Int
    ): String
    deleteAddress(id: Int!): String
  }

  type Address {
    id: Int!
    street_name: String!
    house_number: Int!
  }
`;

const addressResolvers = {
  Query: {
    async getAddress(root, { id }) {
      return Address.findByPk(id);
    },
    async getAllAddress(root) {
      return Address.findAll();
    },
  },

  Mutation: {
    createAddress: async (root, { street_name, house_number }) => {
      try {
        await Address.create({
          street_name,
          house_number
        });
        return "Direccion creada con exito";
      } catch (error) {
        return error.message;
      }
    },

    updateAddress: async (root, { id, street_name, house_number }) => {
      try {
        const address = await Address.findOne({
          where: { id: id, active: true },
        });
        if (address) {
          await Address.update(
            {
              street_name: street_name,
              house_number: house_number
            },
            { where: { id: id } }
          );
          return "Direccion actualizada con exito.";
        }
        const customError = {
          code: 500,
          message: "Direccion no encontrada.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },

    deleteAddress: async (root, { id }) => {
      try {
        const address = await Address.findOne({
          where: { id: id, active: true },
        });
        if (address) {
          await Address.update({ active: false }, { where: { id: id } });
          return "Direccion borrada con exito.";
        }
        const customError = {
          code: 500,
          message: "Direccion no encontrada.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = {
  addressTypeDefs,
  addressResolvers,
};
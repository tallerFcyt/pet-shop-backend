const { gql } = require("apollo-server-express");
const { Product } = require("../models/Product");

const paymentTypeDefs = gql`
  extend type Query {
    getProduct(id: ID!): Product
    getAllProduct: [Product]
    getAllProductByFilter(filter: String!): [Product]
  }

  extend type Mutation {
    createPayment(
      price: Float!,
      user_id: String!
    ): String
    updatePayment(
      id: Int!
      state: String
    ): String
  }

  type Payment {
    id: Int!
    price: String!
    state: String!
  }
`;

const paymentResolvers = {
  Query: {
    async getPayment(root, { id }) {
      return Payment.findByPk(id);
    },
    async getAllPayment(root) {
      return Product.findAll();
    },
  },

  Mutation: {
    createPayment: async (
      root,{ price, user_id }) => {
      try {
        await Product.create({
          price,
          user_id
        });
        return "Pago creado con exito";
      } catch (error) {
        return error.message;
      }
    },

    updatePayment: async (
      root,
      { id, state }) => {
      try {
        const product = await Product.findOne({
          where: { id: id },
        });
        if (product) {
          await Product.update(
            { state: state },
            { where: { id: id } }
          );
          return "Estado de pago actualizado con exito";
        }
        const customError = {
          code: 500,
          message: "Pago no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = {
  productTypeDefs,
  productResolvers,
};

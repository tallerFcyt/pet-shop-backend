const { gql } = require("apollo-server-express");
const { Op } = require("sequelize")
const { Product } = require("../models/Product");
const { sequelize } = require("../../database/db");

const productTypeDefs = gql`
  extend type Query {
    getProduct(id: ID!): Product
    getAllProduct: [Product]
    getAllProductByFilter(filter: String!): [Product]
  }

  extend type Mutation {
    createProduct(
      title: String!
      description: String!
      price: Float!
      stock: Int!
      image_url: String!
    ): String
    updateProduct(
      id: Int!
      title: String
      description: String
      price: Float
      stock: Int
      image_url: String
    ): String
    deleteProduct(id: Int!, active: Boolean!): String
  }

  type Product {
    id: Int!
    title: String!
    description: String!
    price: Float!
    stock: Int!
    image_url: String!
    active: Boolean!
  }
`;

const productResolvers = {
  Query: {
    async getProduct(root, { id }) {
      return Product.findByPk(id);
    },
    async getAllProduct(root) {
      return Product.findAll();
    },
    async getAllProductByFilter(root, { filter }) {
      return Product.findAll({
        where: sequelize.where(
          sequelize.fn('lower', sequelize.col('title')),
          { [Op.iLike]: `%${filter.toLowerCase()}%` }
        )
      });
    },
  },

  Mutation: {
    createProduct: async (
      root,
      { title, description, price, stock, image_url }
    ) => {
      try {
        await Product.create({
          title,
          description,
          price,
          stock,
          image_url,
          active: stock === 0 ? false : true,
        });
        return "Producto creado con exito";
      } catch (error) {
        return error.message;
      }
    },

    updateProduct: async (
      root,
      { id, title, description, price, stock, image_url }
    ) => {
      try {
        const product = await Product.findOne({
          where: { id: id },
        });
        if (product) {
          await Product.update(
            {
              title: title,
              description: description,
              price: price,
              stock: stock,
              image_url: image_url,
              active: stock === 0 ? false : true,
            },
            { where: { id: id } }
          );
          return "Producto actualizado con exito";
        }
        const customError = {
          code: 500,
          message: "Producto no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },

    deleteProduct: async (root, { id, active }) => {
      try {
        const product = await Product.findOne({
          where: { id: id },
        });
        if (product) {
          await Product.update({ active: active }, { where: { id: id } });
          return "Producto eliminado con exito";
        }
        const customError = {
          code: 500,
          message: "Producto no encontrado.",
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

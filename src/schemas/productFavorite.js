const { gql } = require("apollo-server-express");
const { ProductFavorite } = require("../models/ProductFavorite");

const productFavoriteTypeDefs = gql`
  extend type Query {
    getProductFavorite(favorite_id: Int!, product_id: Int!): ProductFavorite
    getAllProductFavorite(favorite_id: Int!): [ProductFavorite]
  }

  extend type Mutation {
    createProductFavorite(favorite_id: Int!, product_id: Int!): String
    deleteProductFavorite(favorite_id: Int!, product_id: Int!): String
    deleteAllProductFavorite(favorite_id: Int!): String
  }

  type ProductFavorite {
    id: Int
    product_id: Int 
    favorite_id: Int
  }
`;

const productFavoriteResolvers = {
  Query: {
    async getProductFavorite(root, { favorite_id, product_id }) {
      return await ProductFavorite.findOne({
        where: {
          favorite_id: favorite_id,
          product_id: product_id,
        },
      });
    },
    async getAllProductFavorite(root, { favorite_id }) {
      return await ProductFavorite.findAll({
        where: {
          favorite_id: favorite_id,
        },
      });
    },
  },

  Mutation: {
    createProductFavorite: async (root, { favorite_id, product_id }) => {
      try {
        const product = await ProductFavorite.findOne({
          where: {
            favorite_id: favorite_id,
            product_id: product_id,
          },
        }); 
        if (!product){
          await ProductFavorite.create({
            favorite_id,
            product_id,
          });
          return "Producto agregado a favoritos con exito";
        }
        else{
          return "El producto ya esta agregado"
        }
      } catch (error) {
        return error.message;
      }
    },

    deleteProductFavorite: async (root, { favorite_id, product_id }) => {
      try {
        const product = await ProductFavorite.findOne({
          where: {
            favorite_id: favorite_id,
            product_id: product_id,
          },
        });
        if (product) {
          await ProductFavorite.destroy({
            where: {
              favorite_id: favorite_id,
              product_id: product_id,
            },
          });
          return "Producto borrado de favoritos con exito";
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

    deleteAllProductFavorite: async (root, { favorite_id }) => {
      try {
        const product = await ProductFavorite.findOne({where: {favorite_id: favorite_id}});
        if (product) {
          await ProductFavorite.destroy({
            where: {
              favorite_id: favorite_id
            },
          });
          return "Favoritos vaciado con exito";
        }
        const customError = {
          code: 500,
          message: "No tiene productos en sus favoritos.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    }
  }
};

module.exports = {
  productFavoriteTypeDefs,
  productFavoriteResolvers,
};

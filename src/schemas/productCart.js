const { gql } = require("apollo-server-express");
const { ProductCart } = require("../models/ProductCart");
const { Cart } = require("../models/Cart")
const { Product } = require("../models/Product")

const productCartTypeDefs = gql`
  extend type Query {
    getProductCart(user_id: ID!): [ProductCart]
    getAllProductCart: [ProductCart]
  }

  extend type Mutation {
    createProductCart(
      quantity: Int!
      total: Float!
      product_id: Int!
      user_id: String!
    ): String
    deleteProductCart(user_id: String! product_id: Int!): String
    deleteAllProductCart(user_id: String!):String
  }

  type ProductCart {
    id: Int
    quantity: Int
    total: Float
    product_id: Int
    cart_id: Int
    user_id: String
    product: Product
  }

`;

const productCartResolvers = {
  Query: {
    async getProductCart(root, { user_id }) {
      //recuperamos el id del carrito mediante el id del usuario 
      const cart_id = await Cart.findOne({
        where: { user_id },
      })
      const cart = await ProductCart.findAll({
        where: { cart_id: cart_id.id },
      })
      return cart
    },
    async getAllProductCart(root) {
      return ProductCart.findAll();
    },
  },

  Mutation: {
    createProductCart: async (root, { quantity, total, product_id, user_id }) => {
      try {
        const cart = await Cart.findOne({
          where: { user_id: user_id },
        })
        const product = await ProductCart.findOne({
          where: {
            cart_id: cart.dataValues.id,
            product_id: product_id,
          },
        });
        if (!product){
          await ProductCart.create({
            quantity,
            total,
            product_id,
            cart_id: cart.dataValues.id
          });
          return "Producto agregado al carrito con exito";
        }
        else{
          const p = await Product.findOne({
            where: {
              id: product_id,
            },
          });
          const stock = p.dataValues.stock
          const cant = product.dataValues.quantity + quantity;
          if (stock >= cant){
            await ProductCart.update({
              quantity: cant,
            }, {where: { product_id: product.dataValues.product_id}})
            return "Producto agregado al carrito con exito";
          }
          else{
            return "Limite de stock excedido";
          }
        }
      } catch (error) {
        return error.message;
      }
    },

    deleteProductCart: async (root, { user_id, product_id }) => {
      try {
        const cart = await Cart.findOne({
          where: { user_id: user_id },
        })
        const product = await ProductCart.findOne({
          where: {
            cart_id: cart.dataValues.id,
            product_id: product_id,
          },
        });
        if (product) {
          await ProductCart.destroy({
            where: {
              cart_id: cart.dataValues.id,
              product_id: product_id,
            },
          });
          return "Producto borrado del carrito con exito";
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
    deleteAllProductCart: async (root, { user_id }) => {
      try {
        const cart = await Cart.findOne({
          where: { user_id: user_id },
        })
        const product = await ProductCart.findOne({where: {cart_id: cart.dataValues.id}});
        if (product) {
          await ProductCart.destroy({
            where: {
              cart_id: cart.dataValues.id
            },
          });
          return "Carrito vaciado con exito";
        }
        const customError = {
          code: 500,
          message: "No tiene productos en su carrito.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    }
    },
    ProductCart: {
      product: ({product_id}) => {
        return Product.findByPk(product_id)
      }
    }
  };
  
  module.exports = {
    productCartTypeDefs,
    productCartResolvers,
  };
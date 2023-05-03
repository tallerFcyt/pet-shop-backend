const { gql } = require("apollo-server-express");
const { ProductBuy } = require("../models/ProductBuy");
const { Buy } = require("../models/Buy");
const { Product } = require("../models/Product");

const productBuyTypeDefs = gql`
  extend type Query {
    getAllProductBuy: [BuyInfo]
    getProductBuyByUser(user_id: String!): [BuyInfo]
  }

  extend type Mutation {
    createProductBuy(
      price: Float!
      quantity: Int!
      product_id: Int!
      buy_id: String!
    ): String
  }

  type Buy {
    id: String!
    totalPrice: Float!
    user_id: String!
    address_id: Int!
    createdAt: DateTime
  }

  type BuyInfo {
    buy: Buy!
    products: [ProductBuy!]!
  }

  type ProductBuy {
    id: Int!
    price: Float!
    quantity: Int!
    product_id: Int!
    buy_id: String
    product: Product
  }
`;

const productBuyResolvers = {
  Query: {
    async getAllProductBuy(root) {
      const data = await ProductBuy.findAll({
        include: [Buy, Product],
      });

      const groupedData = data.reduce((acc, item) => {
        const buyId = item.buy_id;
        if (!acc[buyId]) {
          acc[buyId] = [];
        }
        acc[buyId].push(item);
        return acc;
      }, {});

      const buyInfo = Object.values(groupedData).map((items) => {
        const buy = items[0].buy;
        const products = items.map((item) => {
          const { id, price, quantity, product_id } = item;
          return { id, price, quantity, product_id };
        });
        return { buy, products };
      });

      return buyInfo;
    },

    async getProductBuyByUser(root, { user_id }) {
      const data = await ProductBuy.findAll({
        include: [{ model: Buy, where: { user_id: user_id } }, Product],
        order: [[Buy, "createdAt", "DESC"]],
      });

      const groupedData = data.reduce((acc, item) => {
        const buyId = item.buy_id;
        if (!acc[buyId]) {
          acc[buyId] = [];
        }
        acc[buyId].push(item);
        return acc;
      }, {});

      const buyInfo = Object.values(groupedData)
        .map((items) => {
          const buy = items[0].buy;
          const products = items.map((item) => {
            const { id, price, quantity, product_id } = item;
            return { id, price, quantity, product_id };
          });
          return { buy, products };
        })
        .sort((a, b) => new Date(b.buy.createdAt) - new Date(a.buy.createdAt));

      return buyInfo;
    },
  },

  Mutation: {
    createProductBuy: async (root, { price, quantity, product_id, buy_id }) => {
      try {
        await ProductBuy.create({
          price,
          quantity,
          product_id,
          buy_id,
        });
        return "ProductBuy creado con exito";
      } catch (error) {
        return error.message;
      }
    },
  },
  ProductBuy: {
    product: ({ product_id }) => {
      return Product.findByPk(product_id);
    },
  },
};

module.exports = {
  productBuyTypeDefs,
  productBuyResolvers,
};

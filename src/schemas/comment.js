const { gql } = require("apollo-server-express");
const { sequelize } = require("../../database/db");
const { Comment } = require("../models/Comment");
const { User } = require('../models/User');
const {userTypeDefs, userResolvers} = require ('./user')

const commentTypeDefs = gql`
  extend type Query {
    getComment(id: ID!): Comment
    getAllComment(product_id: Int!): [Comment]
  }

  extend type Mutation {
    createComment(
      comment: String!
      user_id: String!
      product_id: Int!
    ): String
    createResponse(
      id: Int!
      response: String!
    ): String
  }

  scalar DateTime
  type Comment {
    id: Int
    comment: String
    response: String
    comment_date: DateTime
    response_date: DateTime,
    user_id: String,
    user: User,
    product_id: Int
  }
`;


const commentResolvers = {
  Query: {
    async getComment(root, { id }) {
      return Comment.findByPk(id);
    },
    async getAllComment(root, {product_id}) {
      return Comment.findAll({where:{
        product_id: product_id
      }});
    },
  },

  Mutation: {
    createComment: async (root, { comment, user_id, product_id }) => {
      try {
        await Comment.create({
          comment,
          user_id,
          product_id
        });
        return "Comentario creado con exito";
      } catch (error) {
        return error.message;
      }
    },

    createResponse: async (root, { response, id }) => {
      try {
        const comment = await Comment.findOne({
          where: { id: id },
        });
        if (comment) {
          await Comment.update(
            {
              response: response,
              response_date: sequelize.literal("CURRENT_DATE"),
            },
            { where: { id: id } }
          );
          return "Respuesta creada con exito";
        }
        const customError = {
          code: 500,
          message: "Comentario no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },
  Comment: {
    user: ({user_id}) => {
      return User.findByPk(user_id)
    }
  }
};

module.exports = {
  commentTypeDefs,
  commentResolvers,
};
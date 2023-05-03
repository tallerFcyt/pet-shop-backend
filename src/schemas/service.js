const { gql } = require("apollo-server-express");
const { Service } = require("../models/Service");

const serviceTypeDefs = gql`
  extend type Query {
    getService(id: ID!): Service
    getAllService: [Service]
  }

  extend type Mutation {
    createService(
      title: String!
      description: String!
      image_url: String!
      price: Float!
    ): String

    updateService(
      id: Int!
      title: String
      description: String
      image_url: String
      price: Float
    ): String

    deleteService(id: Int!, active: Boolean!): String
  }

  type Service {
    id: Int!
    title: String!
    description: String!
    price: Float!
    image_url: String!
    active: Boolean!
  }
`;

const serviceResolvers = {
  Query: {
    async getService(root, { id }) {
      return Service.findByPk(id);
    },
    async getAllService(root) {
      return Service.findAll();
    },
  },

  Mutation: {
    createService: async (root, { title, description, price, image_url }) => {
      try {
        await Service.create({
          title,
          description,
          price,
          image_url
        });
        return "Servicio creado con exito";
      } catch (error) {
        return error.message;
      }
    },

    updateService: async (root, { id, title, description, price, image_url }) => {
      try {
        const service = await Service.findOne({
          where: { id: id, active: true },
        });
        if (service) {
          await Service.update(
            {
              title: title,
              description: description,
              price: price,
              image_url: image_url
            },
            { where: { id: id } }
          );
          return "Servicio actualizado con exito";
        }
        const customError = {
          code: 500,
          message: "Servicio no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },

    deleteService: async (root, { id, active }) => {
      try {
        const service = await Service.findOne({
          where: { id: id },
        });
        if (service) {
          await Service.update({ active: active }, { where: { id: id } });
          return "Servicio eliminado con exito";
        }
        const customError = {
          code: 500,
          message: "Servicio no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },
};

module.exports = {
  serviceTypeDefs,
  serviceResolvers,
};

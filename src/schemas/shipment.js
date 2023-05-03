const { gql } = require("apollo-server-express");
const { Shipment } = require("../models/Shipment");
const { State } = require("../models/State");


const shipmentTypeDefs = gql`
  extend type Query {
    getShipment(id: ID!): Shipment
    getAllShipment: [Shipment]
  }

  extend type Mutation {
    createShipment(
      state_id: Int!
      buy_id: String!
    ): String
    updateShipment(
      id: Int!
      state_id: Int!
    ): String
  }

  type State {
    id: Int!
    name: String!
  }

  scalar DateTime
  type Shipment {
    id: Int!
    departure_date: DateTime!
    arrival_date: DateTime!
    state_id: Int!
    buy_id: String!
    state: State
  }
`;

const shipmentResolvers = {
  Query: {
    async getShipment(root, { id }) {
      return Shipment.findByPk(id);
    },
    async getAllShipment(root) {
      return Shipment.findAll();
    },
  },

  Mutation: {
    createShipment: async (root, { state_id, buy_id }) => {
      try {
        await Shipment.create({
          state_id,
          buy_id
        });
        return "Envio creado con exito";
      } catch (error) {
        return error.message;
      }
    },

    updateShipment: async (root, { id, state_id }) => {
      try {
        const shipment = await Shipment.findOne({
          where: { id: id },
        });
        if (shipment) {
          await Shipment.update(
            {
              state_id
            },
            { where: { id: id } }
          );
          return "Estado del envio actualizado con exito";
        }
        const customError = {
          code: 500,
          message: "Envio no encontrado.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },

  Shipment:{
    state: ({state_id}) => {
      return State.findByPk(state_id)
    }
  }
};

module.exports = {
  shipmentTypeDefs,
  shipmentResolvers,
};

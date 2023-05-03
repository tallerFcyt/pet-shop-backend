const { gql } = require("apollo-server-express");
const { ServicePet } = require("../models/ServicePet");
const { Pet } = require("../models/Pet");
const { Op } = require("sequelize");

const servicePetTypeDefs = gql`
  extend type Query {
    getServiceByUser(service_id: Int!, user_id: String!): [ServicePet]
  }

  extend type Mutation {
    createServicePet(
      id: String!
      price: Float!
      service_id: Int!
      pet_id: Int!
    ): String
  }

  scalar DateTime
  type ServicePet {
    id: String!
    price: Float!
    service_id: Int!
    pet_id: Int!
    start_date: DateTime
    ending_date: DateTime
    pet: Pet
  }
`;

const servicePetResolvers = {
  Query: {
    async getServiceByUser(root, { service_id, user_id }) {
      // Obtener todas las mascotas del usuario
      const pets = await Pet.findAll({ where: { user_id } });
      const petIds = pets.map((pet) => pet.id);
      
      // Obtener todos los servicios que tengan el service_id y la pet_id en la lista de mascotas
      const services = await ServicePet.findAll({
        where: {
          service_id,
          pet_id: {
            [Op.in]: petIds,
          },
        },
        include: {
          model: Pet,
          where: {
            id: {
              [Op.in]: petIds,
            },
          },
        },
      });

      return services;
    },

  },

  Mutation: {
    createServicePet: async (root, { id, price, service_id, pet_id }) => {
      try {
        await ServicePet.create({
          id,
          price,
          service_id,
          pet_id
        });
        return "ServicePet creado con exito";
      } catch (error) {
        return error.message;
      }
    },
  },
  ServicePet: {
    pet: ({pet_id}) => {
      return Pet.findByPk(pet_id)
    }
  }
};



module.exports = {
  servicePetTypeDefs,
  servicePetResolvers,
};

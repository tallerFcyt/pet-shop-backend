const { gql } = require("apollo-server-express");
const { Pet } = require("../models/Pet");
const { User } = require("../models/User");

const petTypeDefs = gql`
  extend type Query {
    getPet(id: ID!): Pet
    getAllPets(user_id: String!): [Pet]
  }

  extend type Mutation {
    createPet(name: String!, user_id: String!, type: String!): String
    updatePet(id: Int!, name: String!): String
    deletePet(id: Int!): String
  }

  type Pet {
    id: Int!
    name: String!
    user_id: String!
    type: String!
    user: User
  }
`;

const petResolvers = {
  Query: {
    async getPet(root, { id }) {
      return Pet.findByPk(id);
    },
    async getAllPets(root, {user_id}) {
      return Pet.findAll({where: {user_id: user_id}});
    },
  },

  Mutation: {
    createPet: async (root, { name, user_id, type }) => {
      try {
        await Pet.create({
          name,
          user_id,
          type
        });
        return "Mascota creada con exito.";
      } catch (error) {
        return error.message;
      }
    },
    updatePet: async (root, { id, name }) => {
      try {
        const pet = await Pet.findOne({
          where: { id: id, active: true },
        });
        if (pet) {
          await Pet.update(
            {
              name: name,
            },
            { where: { id: id } }
          );
          return "Mascota actualizada con exito.";
        }
        const customError = {
          code: 500,
          message: "Mascota no encontrada.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },

    deletePet: async (root, { id }) => {
      try {
        const pet = await Pet.findOne({
          where: { id: id, active: true },
        });
        if (pet) {
          await Pet.update({ active: false }, { where: { id: id } });
          return "Mascota borrada con exito.";
        }
        const customError = {
          code: 500,
          message: "Mascota no encontrada.",
        };
        throw customError;
      } catch (error) {
        return error.message;
      }
    },
  },
  Pet: {
    user: ({user_id}) => {
      return User.findByPk(user_id)
    }
  }
};

module.exports = {
  petTypeDefs,
  petResolvers,
};

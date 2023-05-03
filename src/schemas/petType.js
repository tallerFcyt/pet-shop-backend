// const { gql } = require("apollo-server-express");
// const { PetType } = require('../models/PetType');

// const PetTypeTypeDefs = gql`
//   extend type Query {
//     getPetType(id: ID!): PetType
//     getAllPetType: [PetType]
//   }

//   type PetType {
//     id: Int!
//     name: String!
//   }
// `;

// const PetTypeResolvers = {
//   Query: {
//     async getPetType(root, { id }) {
//       return PetType.findByPk(id);
//     },
//     async getAllPetType(root) {
//       return PetType.findAll();
//     },
//   }
// }

// module.exports = {
//   PetTypeTypeDefs,
//   PetTypeResolvers
// };

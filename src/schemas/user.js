const { gql } = require('apollo-server-express');
const { User } = require('../models/User');
const { Cart } = require('../models/Cart');
const { Favorite } = require('../models/Favorite');
const { Province } = require('../models/Province');
const { Location } = require('../models/Location');
const { Address } = require('../models/Address');
const { admin } = require('../config')

const userTypeDefs = gql`
  extend type Query{
    getUser(id: String!): User
    getAllUsers: [User]
  }

  extend type Mutation{
    createUser(
      id:String!,
      dni: String!,
      name: String!,
      lastName: String!,
      phone: String!,
      email: String!
      location: Int!,
      address: String!,
      number: Int!
      ): String
  }

  type User{
    id: String
    dni: String
    name: String
    lastName: String
    phone: String
    email: String
    isAdmin: Boolean
  }
`

const userResolvers = {
  Query:{
    async getUser(root, { id }) {
      const data = await User.findByPk(id); 
      return data;  
    },
    async getAllUsers(root){
    const data = await User.findAll();
    return data;
    },
  },

  Mutation:{
    
    createUser: async(root, {id, dni, name, lastName, phone, email, location, address, number}) => {    
      try {
        var isAdmin = false;
        if (email === admin.email){
          isAdmin = true 
        }
        const user = await User.create({
          id,
          dni,
          name,
          lastName,
          phone,
          email,
          isAdmin
        })
        await Cart.create({
          user_id: user.id
        })
        await Favorite.create({
          user_id: user.id 
        })
        await Address.create({
          street_name: address,
          house_number: number,
          user_id: id,
          location_id: location
        })
        return "Usuario creado con exito"
      } catch (error) {
        return error.message
      }
    },
    
  },

}


module.exports = {
  userTypeDefs,
  userResolvers
}

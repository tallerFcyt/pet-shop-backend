// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../../database/db');
// const { Pet } = require('./Pet')

// const PetType = sequelize.define('petType',{
//   id:{
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   name:{
//     type: DataTypes.STRING
//   }
// }, {
//   timestamps: false
// })

// PetType.hasMany(Pet, {
//   foreignKey:'pet_type_id',
//   sourceKey: 'id'
// })

// Pet.belongsTo(PetType, {
//   foreignKey: 'pet_type_id',
//   sourceKey: 'id'
// })

// module.exports = {
//   PetType
// }

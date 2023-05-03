const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { ServicePet } = require('./ServicePet');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Pet = sequelize.define('pet',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING
  },
  type:{
    type: DataTypes.STRING
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false
});

//Una mascota tiene muchos servicios.
Pet.hasMany(ServicePet, {
  foreignKey:'pet_id',
  sourceKey: 'id'
})

//Un servicio pertenece a una mascota.
ServicePet.belongsTo(Pet, {
  foreignKey: 'pet_id',
  targetId: 'id'
})

module.exports = {
  Pet
}
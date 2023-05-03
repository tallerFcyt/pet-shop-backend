const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Buy } = require('./Buy');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Address = sequelize.define('address',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  street_name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  house_number:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false
});

//Una direccion tiene muchas compras.
Address.hasOne(Buy,{
  foreignKey: 'address_id',
  sourceKey: 'id'
});

//Una compra pertenece una direccion.
Buy.belongsTo(Address, {
  foreignKey: 'address_id',
  targetId: 'id'
});

module.exports = {
  Address
};
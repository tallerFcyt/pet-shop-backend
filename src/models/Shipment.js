const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Buy } = require('./Buy');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Shipment = sequelize.define('shipment',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departure_date:{
    type: "TIMESTAMP",
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  arrival_date:{
    type: DataTypes.DATE,
    defaultValue: new Date().setDate(new Date().getDate() + 4)
  }

}, {
  timestamps: false
});


module.exports = {
  Shipment
}
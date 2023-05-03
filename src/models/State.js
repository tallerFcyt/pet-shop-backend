const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Shipment } = require('./Shipment')

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const State = sequelize.define('state',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
});

//Un envio tiene muchos estados
State.hasMany(Shipment, {
  foreignKey:'state_id',
  sourceKey: 'id'
})

//Un estado pertenece a un envio
Shipment.belongsTo(State,{
  foreignKey: 'state_id',
  targetId: 'id'
})

module.exports = {
  State
}
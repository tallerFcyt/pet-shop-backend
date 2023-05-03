const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Address } = require('./Address')

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Location = sequelize.define('location',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

//Un localidad tiene muchas direcciones
Location.hasMany(Address,{
  foreignKey:'location_id',
  sourceKey: 'id'
})

//Una direccion pertenece a un localidad.
Address.belongsTo(Location,{
  foreignKey: 'location_id',
  targetId: 'id'
})

module.exports = {
  Location
}
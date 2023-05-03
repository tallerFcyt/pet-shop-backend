const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Location } = require('./Location');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Province = sequelize.define('province',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

//Una provincia tiene muchas localidades
Province.hasMany(Location, {
  foreignKey:'province_id',
  sourceKey: 'id'
});

Location.belongsTo(Province, {
  foreignKey: 'province_id',
  targetId: 'id'
});

module.exports = {
  Province
}
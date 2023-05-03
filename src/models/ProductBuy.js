const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const ProductBuy = sequelize.define('product_buy',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.FLOAT
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: false
});

module.exports = {
  ProductBuy
}
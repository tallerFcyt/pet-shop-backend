const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');

const ProductCart = sequelize.define('product_cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.FLOAT
  }
}, {
  timestamps: false
})

module.exports = {
  ProductCart
}
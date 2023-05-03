const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');

const ProductFavorite = sequelize.define('product_favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  timestamps: false
})

module.exports = {
  ProductFavorite
}
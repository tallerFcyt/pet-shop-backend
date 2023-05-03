const { DataTypes } = require("sequelize");
const { sequelize } = require('../../database/db');

const Payment = sequelize.define('payment',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  state: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});


module.exports = {
  Payment
}
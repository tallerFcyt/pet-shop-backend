const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { ProductBuy } = require('./ProductBuy');
const { Shipment } = require('./Shipment')

const Buy = sequelize.define('buy', {
  id:{
    type: DataTypes.STRING,
    primaryKey: true,
  },
  totalPrice:{
    type: DataTypes.FLOAT
  },
}, {
  timestamps: true
})

Buy.hasMany(ProductBuy,{
  foreignKey:'buy_id',
  sourceKey: 'id'
})

ProductBuy.belongsTo(Buy, { foreignKey: 'buy_id' });


//Un Envio tiene muchas compras.
Buy.hasOne(Shipment,{
  foreignKey: 'buy_id',
  sourceKey: 'id'
});

//Una compra pertenece un envio.
Shipment.belongsTo(Buy, {
  foreignKey: 'buy_id',
  targetId: 'id'
});

module.exports = {
  Buy
}
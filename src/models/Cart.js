const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { User } = require('./User');
const { ProductCart } = require('./ProductCart');


//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Cart = sequelize.define('cart',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  timestamps: false
});

//Un usuario tiene un carrito
User.hasOne(Cart,{
  foreignKey: 'user_id',
  sourceKey: 'id'
});

//Un carrito tiene un usuario.
Cart.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
});

//Un usario tiene muchos products en carrito.
Cart.hasMany(ProductCart, {
  foreignKey:'cart_id',
  sourceKey: 'id'
})

//Un carrito pertenece a un usuario.
ProductCart.belongsTo(Cart, {
  foreignKey: 'cart_id',
  targetId: 'id'
})


module.exports = {
  Cart
}
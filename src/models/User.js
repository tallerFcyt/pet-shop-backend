const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { Pet } = require('./Pet');
const { Comment } = require('./Comment');
const { Favorite } = require('./Favorite');
const { Address } = require('./Address');
const { Buy } = require('./Buy');
const { Payment } = require('./Payment');

//Define en el primer parametro define el nombre de la tabla y el segundo va a ser un objeto con los atributos de la tabla
const User = sequelize.define('user',{
  id:{
    type: DataTypes.STRING,
    primaryKey: true,
  },
  dni:{
    type: DataTypes.STRING,
    unique: true
  },
  name:{
    type: DataTypes.STRING
  },
  lastName:{
    type: DataTypes.STRING
  },
  phone:{
    type: DataTypes.STRING
  },
  email:{
    type: DataTypes.STRING
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  timestamps: false
});

//Un usario tiene muchas mascotas.
User.hasMany(Pet, {
  foreignKey:'user_id',
  sourceKey: 'id'
})

//Una mascota pertenece a un usuario.
Pet.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
})

//Un usario tiene muchos comentarios.
User.hasMany(Comment, {
  foreignKey:'user_id',
  sourceKey: 'id'
})

//Una comentario pertenece a un usuario.
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
})

//Un favorito tiene un usuario.
User.hasOne(Favorite,{
  foreignKey: 'user_id',
  sourceKey: 'id'
});

//Un usuario tiene un favorito.
Favorite.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
});

//Un usuario tiene viarias direcciones.
User.hasMany(Address, {
  foreignKey:'user_id',
  sourceKey: 'id'
})

//Una dirección pertenece a un usuario.
Address.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
})

//Un Usuario tiene muchas compras.
User.hasOne(Buy,{
  foreignKey: 'user_id',
  sourceKey: 'id'
});

//Una compra pertenece un usuario.
Buy.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
});

//Un usario tiene muchos pagos.
User.hasMany(Payment, {
  foreignKey:'user_id',
  sourceKey: 'id'
})

//Un pago pertenece a un usuario.
Payment.belongsTo(User, {
  foreignKey: 'user_id',
  targetId: 'id'
})

module.exports = {
  User
}
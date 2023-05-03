const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { User } = require('./User');
const { ProductFavorite } = require('./ProductFavorite')

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Favorite = sequelize.define('favorite',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
}, {
  timestamps: false
});


//Un usario tiene muchos productos favoritos.
Favorite.hasMany(ProductFavorite, {
  foreignKey:'favorite_id',
  sourceKey: 'id'
})

//Un favorito pertenece a un usuario.
ProductFavorite.belongsTo(Favorite, {
  foreignKey: 'favorite_id',
  targetId: 'id'
})

module.exports = {
  Favorite
}
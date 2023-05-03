const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { ProductFavorite } = require('./ProductFavorite')
const { ProductCart } = require('./ProductCart')
const { ProductBuy } = require('./ProductBuy')
const { Comment } = require('./Comment')

const Product = sequelize.define('product',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title:{
    type: DataTypes.STRING
  },
  description:{
    type: DataTypes.STRING(1234)
  },
  price:{
    type: DataTypes.FLOAT
  },
  stock:{
    type: DataTypes.INTEGER
  },
  image_url:{
    type: DataTypes.STRING(1234)
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
})

//Un producto tiene muchos favoritos
Product.hasMany(ProductFavorite,{
  foreignKey:'product_id',
  sourceKey: 'id'
})

//Un favorito pertenece a un producto.
ProductFavorite.belongsTo(Product,{
  foreignKey: 'product_id',
  targetId: 'id'
})

//Un producto tiene muchos favoritos
Product.hasMany(ProductCart, {
  foreignKey:'product_id',
  sourceKey: 'id'
})

//Un favorito pertenece a un producto.
ProductCart.belongsTo(Product, {
  foreignKey: 'product_id',
  targetId: 'id'
})

//Un producto tiene muchos comentarios.
Product.hasMany(Comment, {
  foreignKey:'product_id',
  sourceKey: 'id'
})

//Un comentario pertenece a un producto.
Comment.belongsTo(Product, {
  foreignKey: 'product_id',
  targetId: 'id'
})

//Un producto tiene muchas compras
Product.hasMany(ProductBuy,{
  foreignKey:'product_id',
  sourceKey: 'id'
})

//Un producto pertenece a una compra.
ProductBuy.belongsTo(Product,{
  foreignKey: 'product_id',
  targetId: 'id'
})

module.exports={
  Product
}
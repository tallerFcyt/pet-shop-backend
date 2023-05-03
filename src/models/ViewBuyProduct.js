// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../../database/db");

// //Define en el primer parametro define el nombre de la tabla y el segundo va a ser un objeto con los atributos de la tabla
// const ViewBuyProduct = sequelize.define(
//   "ViewBuyProduct",
//   {
//     productbuy_id: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//     },
//     user_id: {
//       type: DataTypes.STRING,
//     },
//     buy_id: {
//       type: DataTypes.STRING,
//     },
//     totalPrice: {
//       type: DataTypes.FLOAT,
//     },
//     address_id: {
//       type: DataTypes.INTEGER,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//     },
//     product_id: {
//       type: DataTypes.INTEGER,
//     },
//     image_url: {
//       type: DataTypes.STRING,
//     },
//     title: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     tableName: "view_buy_product", // Nombre de la vista en la base de datos
//     timestamps: true, // activa los timestamps por defecto en Sequelize
//     freezeTableName: true, // Desactiva la pluralización del nombre de la tablaview_buy_product
//   }
// );

// sequelize.query(
//   `
// CREATE OR REPLACE VIEW view_buy_product AS
// SELECT
//   u.id AS user_id,
//   b.id AS buy_id,
//   b."totalPrice",
//   b.address_id,
//   pb.id as productBuy_id,
//   pb.price,
//   pb.quantity,
//   p.id AS product_id,
//   p.image_url,
//   p.title,
//   p.description
// FROM
//   users u
//   INNER JOIN buys b ON u.id = b.user_id
//   INNER JOIN product_buys pb ON b.id = pb.buy_id
//   INNER JOIN products p ON pb.product_id = p.id;`,
//   { type: sequelize.QueryTypes.RAW }
// );

// module.exports = {
//   ViewBuyProduct,
// };

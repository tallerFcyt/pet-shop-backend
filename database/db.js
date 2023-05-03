const { db } = require('../src/config')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "postgres",
});

// const sequelize = new Sequelize("postgres://taller:mMcLezbgC9kK4mDIJSyg2GkPx6CV4dGx@dpg-ch9c57bhp8u0vhbv0pfg-a.oregon-postgres.render.com/petshop_b264", {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: true
//   }
// });

module.exports = {
  sequelize,
};

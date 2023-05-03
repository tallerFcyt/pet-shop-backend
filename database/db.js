const { db } = require('../src/config')
const Sequelize = require("sequelize");

// const sequelize = new Sequelize(db.database, db.user, db.password, {
//   host: db.host,
//   dialect: "postgres",
// });

const sequelize = new Sequelize(db.db_render, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

module.exports = {
  sequelize,
};

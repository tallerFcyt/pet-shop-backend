const { config } = require('dotenv');
config();

module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    db_render: process.env.DB_HOST_RENDER
  },
  admin: {
    email: process.env.EMAIL_ADMIN,
  },
  mp: {
    accessToken: process.env.ACCESS_TOKEN,
    integratorId: process.env.INTEGRATORID
  }
}
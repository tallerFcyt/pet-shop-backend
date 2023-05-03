const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs} = require('./src/schemas')
const router = require('./src/mercadopago/mercadopago.router')
const server = new ApolloServer({ typeDefs, resolvers,
})

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
}));

app.use(router)

const startApolloServer = async () => {
  await server.start()
  server.applyMiddleware({ app });
}


startApolloServer()

module.exports = {
  app
}
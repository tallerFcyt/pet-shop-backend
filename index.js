const { sequelize } = require('./database/db');
const mercadopago = require("mercadopago");
const { app } = require('./app')
require('dotenv').config()
const { mp } = require('./src/config');
require('./src/cron/servicePetUpdater'); // importar y ejecutar el archivo servicePetUpdater.js

// Agrega credenciales
mercadopago.configure({
  access_token: mp.accessToken
});

//Requerimos todos los modelos para que sequelize los use en sus metodos sync
require('./src/models/User');
require('./src/models/State');
require('./src/models/Shipment');
require('./src/models/Product');
require('./src/models/Province');
require('./src/models/Location');
// require('./src/models/PetType');
require('./src/models/Pet');
require('./src/models/Cart');
require('./src/models/ProductCart');
require('./src/models/Favorite');
require('./src/models/ProductFavorite');
require('./src/models/Comment');
require('./src/models/Service');
require('./src/models/ServicePet');
require('./src/models/Buy')
require('./src/models/ProductBuy')
require('./src/models/Address')
// require('./src/models/ViewBuyProduct')

//Funcion principal que autentica sequelize y corre la app en graphql, si hay un error nos dice cual es mediante trycatch

async function Main(){
  try {

    await sequelize.sync({/*force: true*/});
    
    app.listen({port: 4000}, ()=>console.log('Corriendo GraphQL API server en: http://localhost:4000/graphql'));

  } catch (error) {
    console.log('No se pudo conectar a la base de datos', error)
  }
}

Main()
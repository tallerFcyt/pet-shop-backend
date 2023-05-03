const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');


//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const ServicePet = sequelize.define('service_pet',{
    id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    start_date:{
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    ending_date:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("now()::date+'1 month'::interval"),
    },
    price:{
        type: DataTypes.FLOAT
    },
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
  timestamps: false
});


module.exports = {
  ServicePet
}
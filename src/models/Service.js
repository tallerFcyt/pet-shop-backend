const { DataTypes } = require('sequelize');
const { sequelize } = require('../../database/db');
const { ServicePet } = require('./ServicePet');

//En el primer parametro define el nombre de la tabla y el segundo es un objeto con los atributos de la tabla
const Service = sequelize.define('service',{
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
    image_url:{
      type: DataTypes.STRING(1234)
    },
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
}, {
  timestamps: false
});

//Un servicio tiene muchas servicePet.
Service.hasMany(ServicePet, {
  foreignKey:'service_id',
  sourceKey: 'id'
})

//Un servicePet pertenece a una servicio.
ServicePet.belongsTo(Service, {
  foreignKey: 'service_id',
  targetId: 'id'
})

module.exports = {
  Service
}
const cron = require('node-cron');
const { ServicePet } = require('../models/ServicePet');

// Programar tarea para actualizar los servicios de mascotas

// cron(0 (segundo) 0 (minuto) * (hora) * (día) * (mes))
cron.schedule('0 0 * * *', async () => {
  // Obtener los servicios de mascotas que todavía están activos
  const activeServices = await ServicePet.findAll({
    where: {
      active: true,
    },
  });

  // Obtener la fecha actual
  const now = new Date();

  // Actualizar el campo 'active' de los servicios cuya 'ending_date' ha pasado
  activeServices.forEach(async (service) => {
    if (service.ending_date <= now) {
      service.active = false;
      await service.save();
    }
  });
});

console.log('Tarea programada para actualizar los servicios de mascotas.');

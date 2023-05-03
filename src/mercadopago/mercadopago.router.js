const Router = require('express');
const {Payment, sendNotification, getItems, PaymentService} = require("./mercadopago.controller");
// const sendNotification = require("./mercadopago.controller");

const router = Router();

router.post('/payment', Payment);
router.post('/payment/service', PaymentService);
router.post('/payment/notification', sendNotification);
router.post('/payment/items', getItems)


module.exports = router;
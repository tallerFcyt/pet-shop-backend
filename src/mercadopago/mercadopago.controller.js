const mercadopago = require('mercadopago');
const nodemailer = require('nodemailer');
const {request, response } = require('express');

const mail = `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Gracias por tu compra</title>
</head>
<body>
	<div style="max-width: 600px; margin: 0 auto;">
		<h1 style="text-align: center; font-size: 28px; margin-top: 40px;">Gracias por tu compra</h1>
		<p style="font-size: 16px; line-height: 24px; margin-top: 30px;">Estimado(a) cliente,</p>
		<p style="font-size: 16px; line-height: 24px;">Queremos agradecerte por tu compra en nuestra tienda en línea. Nos complace saber que has encontrado lo que buscabas y esperamos que estés satisfecho(a) con tu compra.</p>
		<p style="font-size: 16px; line-height: 24px;">Si necesitas algo más, no dudes en contactarnos. Estamos aquí para ayudarte en todo lo que necesites.</p>
		<p style="font-size: 16px; line-height: 24px;">Gracias de nuevo por confiar en nosotros.</p>
		<p style="font-size: 16px; line-height: 24px;">Atentamente,</p>
		<p style="font-size: 16px; line-height: 24px;">El equipo de PetShop</p>
	</div>
</body>
</html>`

const Payment = async (req, res) => {
  const { user_id, name, email, items } = req.body;

  const preference = {
    items: items,
    payer: {
      user_id,
      email,
      name
    },
    back_urls: {
      success: 'http://localhost:3000/buys',
      pending: 'http://localhost:3000/payment-pending',
      failure: 'http://localhost:3000/cart'
    },
    auto_return: 'approved',
    statement_descriptor: "PET-SHOP"
  };

  mercadopago.preferences.create(preference)
    .then(response => {
      return res.json(response.body);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error al crear el pago');
    });
}

const PaymentService = async (req, res) => {
  const { user_id, name, email, items } = req.body;

  const preference = {
    items: items,
    payer: {
      user_id,
      email,
      name
    },
    back_urls: {
      success: 'http://localhost:3000/services',
      pending: 'http://localhost:3000/payment-service-pending',
      failure: 'http://localhost:3000/services'
    },
    auto_return: 'approved',
    statement_descriptor: "PET-SHOP"
  };

  mercadopago.preferences.create(preference)
    .then(response => {
      return res.json(response.body);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error al crear el pago');
    });
}

const sendNotification = async (req, res) => {
  // Obtener el id del pago
  const {payment_id, email} = req.body;
  // Obtener los datos del pago
  const paymentInfo = await mercadopago.payment.get(payment_id);

  // Verificar si el pago está aprobado
  if (paymentInfo.status === 200) {
    // Enviar un email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // secure:true,
      // port: 465,
      auth: {
        user: 'petshop.taller@gmail.com',
        pass: 'rtkqpurpjfqldead'
      }
    });

    const mailOptions = {
      from: 'petshop.taller@gmail.com',
      to: email,
      subject: 'Pago aprobado',
      text: 'El pago ha sido aprobado.',
      html: mail
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  }

  res.status(200).send('error notification')
};

const getItems = async (req, res) => {
  const {payment_id} = req.body;
  // Obtener los datos del pago
  const paymentInfo = await mercadopago.payment.get(payment_id);
  //Array de productos
  
  // Verificar si el pago está aprobado
  if (paymentInfo.status === 200) {
    const totalAmount = paymentInfo.body.transaction_details.total_paid_amount;
    const items = paymentInfo.body.additional_info.items;
    return res.send([totalAmount, items])
  } 

  res.status(400).send('error get items')
}

module.exports = {Payment, sendNotification, getItems, PaymentService};
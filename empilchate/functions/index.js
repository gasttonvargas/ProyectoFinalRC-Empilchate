const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios'); 

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.post('/create-preference', async (req, res) => {
  const items = req.body.items;

  try {
    const preference = await createMercadoPagoPreference(items);
    res.status(200).json(preference);
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    res.status(500).send('Error al crear la preferencia de pago');
  }
});

exports.api = functions.https.onRequest(app);

const createMercadoPagoPreference = async (items) => {
  const accessToken = 'APP_USR-682251772192805-090221-46724c815036ab91ae090bd143675b52-265502444';
  const url = 'https://api.mercadopago.com/checkout/preferences?access_token=' + accessToken;

  try {
    const response = await axios.post(url, {
      items: items,
      back_urls: {
        success: 'https://tu-sitio.com/success',
        failure: 'https://tu-sitio.com/failure',
        pending: 'https://tu-sitio.com/pending'
      },
      auto_return: 'approved'
    });

    return response.data;
  } catch (error) {
    console.error('Error al interactuar con MercadoPago:', error);
    throw new Error('Error al crear la preferencia de pago con MercadoPago');
  }
};

import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-682251772192805-090221-46724c815036ab91ae090bd143675b52-265502444' 
});

export const createPreference = async (items) => {
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      items: items,
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending"
      },
      auto_return: "approved",
    });
    return result;
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    throw error;
  }
};
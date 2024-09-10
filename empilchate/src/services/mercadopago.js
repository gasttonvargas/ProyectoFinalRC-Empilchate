export const createPreference = async (items) => {
  try {
    const response = await fetch('https://us-central1-empilchate-ecommerce.cloudfunctions.net/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    throw error;
  }
};

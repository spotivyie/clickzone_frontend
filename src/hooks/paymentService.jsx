import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createPaymentIntent = async (amount) => {
  const res = await axios.post(`${API_URL}/api/payment`, { amount });
  return res.data.clientSecret;
};

export const createOrder = async (token, cartItems, address, payment) => {
  const order = {
    items: cartItems.map(({ _id, quantity }) => ({ productId: _id, quantity })),
    shipping: {
      address: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    },
    payment,
  };

  const res = await axios.post(`${API_URL}/api/orders`, order, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

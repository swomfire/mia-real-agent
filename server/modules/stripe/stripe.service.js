const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

export const createCustomer = (user) => {
  const { email } = user;
  return stripe.customers.create({
    description: `Customer for ${email}`,
    email,
  });
};

export const createCard = (cusId, card) => stripe.customers.createSource(
  cusId,
  card,
);
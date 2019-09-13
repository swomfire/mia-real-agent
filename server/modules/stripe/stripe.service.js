const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

export const createCustomer = (user) => {
  const { email } = user;
  return stripe.customers.create(
    {
      description: `Customer for ${email}`,
      email,
    },
  );
};

export const createCard = (cusId, card) => stripe.customers.createSource(
  cusId,
  card,
);

export const removeCard = (cusId, card) => stripe.customers.deleteSource(
  cusId,
  card,
);

export const createCharge = async (customer, cardId, amount, description) => {
  const paymentIntent = stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    confirm: true,
    customer,
    payment_method: cardId,
    description,
  });
  return paymentIntent;
};

const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal environment and client
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports.PayPalClient = {
  createPayment: async (amount, currency) => {
    // Create PayPal order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        },
      ],
    });

    try {
      // Send request to PayPal API
      const response = await client.execute(request);
      const order = response.result;

      // Extract relevant information from the order
      const orderId = order.id;
      const approveUrl = order.links.find(link => link.rel === 'approve').href;

      // Return the payment details
      return {
        orderId,
        approveUrl,
      };
    } catch (error) {
      console.error('Error creating PayPal payment:', error);
      throw new Error('Failed to create PayPal payment.');
    }
  },
};

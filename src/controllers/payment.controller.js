import { Payment, MercadoPagoConfig } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
});
const payments = new Payment(client);

export const createOrder = async (req, res) => {
  const {
    token,
    /* title,
    description,
    quantity,
    unitPrice,*/
    transactionAmount,
    installments,
    paymentMethodId,
    email,
    identificationType,
    identificationNumber,
    issuer,
  } = req.body;
  console.log("req.body", req.body);
  try {
    const result = await payments.create({
      body: {
        token,
        transaction_amount: 101,
        installments: installments,
        payment_method_id: paymentMethodId,
        issuer: issuer,
        payer: {
          email: "jhon@doe.com",
          identification: {
            type: identificationType,
            number: identificationNumber,
            /* additional_info: {
              items: [
                {
                  title,
                  description,
                  quantity,
                  unitPrice,
                },
              ],
            }, */
          },
        },
      },
    });

    console.log("Payment Result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

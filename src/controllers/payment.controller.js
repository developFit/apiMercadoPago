import { Payment, MercadoPagoConfig } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "../config.js"; 

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
});
const payments = new Payment(client);

export const createOrder = async (req, res) => {
  
  console.log("req.body", req.body);
  try {
    const result = await payments.create({
      body: {
        ...req.body
      },
    });

    console.log("Payment Result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

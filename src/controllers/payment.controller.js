import { Payment, MercadoPagoConfig } from "mercadopago";
import { MERCADOPAGO_ACCESS_TOKEN } from "../config.js";

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
});
const payments = new Payment(client);

export const createOrder = async (req, res) => {
  console.log("req.body", req.body);

  const {
    token,
    transaction_amount,
    installments,
    payment_method_id,
    issuer_id,
    payer: { email, identification_type, identification_number },
    userId,
  } = req.body;

  //console.log("userId-back", userId);

  try {
    const result = await payments.create({
      body: {
        //...req.body,
        /* title,
        description,
        quantity,
        unitPrice,*/
        token,
        transaction_amount,
        installments,
        payment_method_id,
        issuer_id,
        payer: {
          email,
          identification_type,
          identification_number,
        },
      },
    });

    console.log("Payment Result:", result);
    res.status(200).json(result);

    // Tomar el valor que se necesite guardar en la tabla de pagos:
    /* const {
      id,
      payer,
      status,
      status_detail,
      money_release_status,
      date_created,
      date_approved,
      money_release_date,
      date_last_updated,
    } = result;

    console.log(
      id,
      payer,
      status,
      status_detail,
      money_release_status,
      date_created,
      date_approved,
      money_release_date,
      date_last_updated
    ); */
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

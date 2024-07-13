// import { Payment, MercadoPagoConfig } from "mercadopago";
// import { MERCADOPAGO_ACCESS_TOKEN } from "../config.js";
const mercadopago = require('mercadopago');
const PaymentMP = mercadopago.Payment;
const MercadoPagoConfig = mercadopago.MercadoPagoConfig;

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-4632705797816674-070515-961081a93d3f9a171d24011d08424bd8-628501586"
});
const paymentsMP = new PaymentMP(client);

const paymentService = require("../services/paymentService");

exports.createPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.createPayments(req);
    res.send(payments);
  } catch (err) {
    next(err);
  }
};

exports.getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.getPaymentById = async (req, res, next) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const {
    token,
    transactionAmount,
    installments,
    paymentMethodId,
    email,
    identificationType,
    identificationNumber,
    issuer,
  } = req.body;

  try {
    const result = await paymentsMP.create({
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
    const pay = { body: {
      mercadopagoId: result.id, 
      status: result.status,
      total: result.installment_amount
    }

    };
    const paymentDB = await paymentService.createPayments(pay);
    res.status(200).json(paymentDB);
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
  // return res.send('s');
};

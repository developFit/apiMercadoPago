const mercadopago = require("mercadopago");
const paymentService = require("../services/paymentService");

const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
const PaymentMP = mercadopago.Payment;
const MercadoPagoConfig = mercadopago.MercadoPagoConfig;

const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_ACCESS_TOKEN,
});
const paymentsMP = new PaymentMP(client);

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
    transaction_amount,
    installments,
    payment_method_id,
    issuer_id,
    payer: { email, identification_type, identification_number },
    userId,
  } = req.body;

  try {
    const result = await paymentsMP.create({
      body: {
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

    const pay = {
      body: {
        userId: userId,
        mercadopagoId: result.id,
        status: result.status,
        total: result.transaction_amount,
      },
    };
    const paymentDB = await paymentService.createPayments(pay);
    res.status(200).json(paymentDB);
  } catch (error) {
    console.log("Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

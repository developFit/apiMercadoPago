const Payment = require('../models').Payment;
// const models = require('../models/index');

exports.createPayments = async (req) => {
    const {mercadopagoId, status, total} = req.body
    return await Payment.create({
        mercadopagoId: mercadopagoId,
        status: status,
        total: total
    });
}

exports.getAllPayments = async () => {
  return await Payment.findAll();
};

exports.getPaymentById = async (id) => {
  return await Payment.findByPk(id);
};

exports.getCreateOrder = async () => {
    return await "Payment.findByPk(id)";
  };
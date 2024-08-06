const Payment = require('../models').Payment;
// const models = require('../models/index');

exports.createPayments = async (req) => {
    const {userId, mercadopagoId, status, total} = req.body
    return await Payment.create({
        userId: userId,
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
const router = require('express').Router();

const paymentController = require('../controllers/paymentController')
const models = require('../models')

router.get('/payments', paymentController.getAllPayments);
router.get('/payment/:id', paymentController.getPaymentById);
router.post('/create', paymentController.createPayments);
router.post("/create-order", paymentController.createOrder );

// router.get('/payment/success', (req, res) => res.send('creating order'));
// router.get('/payment/webhook', (req, res) => res.send('creating order'));

// //Make post request
// router.post('/create', (req, res) => {
//     const {mercadopagoId, status, total} = req.body
//     models.Payment.create({
//         mercadopagoId: mercadopagoId,
//         status: status,
//         total: total
//     }).then((payment) => {
//         res.send(payment)
//     }).catch((err) => {
//         sendError(err)
//     })
// });

// router.get('/payments', (req, res) => {
//     models.Payment.findAll()
//     .then((payments) => {
//         res.json(payments);
//     }).catch((err) => {
//         res.json(err);
//     })
// });

//Payment by id
// router.get('/payment/:id', (req, res) => {
//     const {id} = req.params

//     models.Payment.findByPk(id)
//     .then((payment) => {
//         res.json(payment);
//     }).catch((err) => {
//         res.json(err);
//     })
// });

module.exports = router;
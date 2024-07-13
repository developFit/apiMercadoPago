const express = require('express')
const paymentroutes = require('./routes/payment.routes.js')
const app = express()
const port = 3000
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//middleware de manejo de errores
app.use(errorHandler);

app.use(cors());

// middleware
app.use(express.json());

//defines all routes
app.use(paymentroutes);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
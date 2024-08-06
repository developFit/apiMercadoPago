require("dotenv").config();
const express = require("express");
const cors = require("cors");
const paymentroutes = require("./routes/payment.routes.js");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT  || 3000;;
const app = express();

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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

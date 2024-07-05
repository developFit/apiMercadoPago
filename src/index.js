import express from "express";
import paymentRoutes from "./routes/payment.routes.js";

const PORT = 3000;

// inicializamos el servidor
const app = express();

app.use(paymentRoutes);

app.listen(PORT);
console.log("Server on port", PORT);

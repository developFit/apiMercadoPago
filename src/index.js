import express from "express";
import morgan from "morgan";
import cors from "cors";
//import mercadopago from 'mercadopago';
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from './config.js'
// inicializamos el servidor
const app = express();

// visualiza las peticiones HTTP en la consola
app.use(morgan("dev"));

app.use(express.json()); 
app.use(cors())

app.use("/api", paymentRoutes);

app.listen(PORT);
console.log("Server on port", PORT);

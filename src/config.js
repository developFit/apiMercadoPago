//export const PORT = 3000
import { config } from "dotenv";
config();

export const PORT = process.env.PORT
export const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

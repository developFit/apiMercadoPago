import express from "express";
import morgan from "morgan";
import cors from "cors";
//import mercadopago from 'mercadopago';
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";

import { Sequelize } from "sequelize";

// inicializamos el servidor
const app = express();

//parámetros de conexión a la DB
const sequelize = new Sequelize("world", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

//Modelo
const worldModel = sequelize.define(
  "city",
  {
    /* "id": {type: Sequelize.INTEGER, primaryKey: true},
  "payer": Sequelize.STRING,
  "status": Sequelize.STRING, */
    id: { type: Sequelize.INTEGER, primaryKey: true },
    name: Sequelize.STRING,
    countryCode: Sequelize.STRING,
    district: Sequelize.STRING,
    population: Sequelize.STRING,
    /* "status_detail": Sequelize.STRING,
  "money_release_status": Sequelize.STRING,
  "date_created": Sequelize.DATE,
  "date_approved": Sequelize.DATE,
  "money_release_date": Sequelize.DATE,
  "date_last_updated": Sequelize.DATE */
  },
  {
    tableName: "city",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("CONEXION OK");
  })
  .catch((error) => {
    console.log("Error de conexión: ", error);
  });

worldModel
  .findAll({
    attributes: ["name", "countryCode", "district", "population"],
    limit: 10,
  })
  .then((city) => {
    const resultados = JSON.stringify(city);
    console.log(resultados);
  })
  .catch((error) => {
    console.log("error: ", error);
  });

// visualiza las peticiones HTTP en la consola
app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

app.use("/api", paymentRoutes);

app.listen(PORT);
console.log("Server on port", PORT);

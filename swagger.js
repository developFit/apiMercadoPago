// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Mercado pago Gateway Documentation',
      version: '1.0.0',
      description: 'API Information',
      contact: {
        name: 'Developer',
      },
      servers: ['http://localhost:3000'],
    },
  },
  apis: ['./routes/*.routes.js'], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
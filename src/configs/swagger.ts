import swaggerJsDoc, { SwaggerDefinition } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import express from "express";

const setupSwagger = (app: express.Application): void => {
  const swaggerDefinition: SwaggerDefinition = {
    info: {
      openapi: "3.0.0",
      title: "Node, Ts and sequelize",
      version: "1.0.0",
    },
  };

  const swaggerOptions = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../routes/*.ts")],
  };

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
};

export default setupSwagger;
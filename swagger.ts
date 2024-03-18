import { Options } from "swagger-jsdoc";

const swaggerDefinition: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SMRPO API",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express and TypeScript.",
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          value: "Bearer <JWT token here>",
        },
      },
    },
    basePath: "/",
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],
  },
  // Paths to files where you've defined your routes
  apis: ["./src/api/routes/*.ts"],
};

export default swaggerDefinition;

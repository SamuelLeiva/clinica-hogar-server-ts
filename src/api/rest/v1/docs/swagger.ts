import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Hogar Clinica API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `http://localhost:${process.env.SERVER_PORT}`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      appointment: {
        type: "object",
        required: ["date", "appointmentType"],
        properties: {
          date: {
            type: "Date",
          },
          appointmentType: {
            type: "string",
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/api/rest/v1/routes/*ts"],
};

export default swaggerJSDoc(swaggerOptions);

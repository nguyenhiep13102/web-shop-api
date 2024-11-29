import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const swagger = (app) => {
  const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Restaurant management Express API with Swagger",
        version: "0.1.0",
       
      },
      servers: [
        {
          url: `http://localhost:${port}`,
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
    },
    apis: ["./src/swagger/*.yaml"],
  };

  const specs = swaggerJSDoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};

export default swagger;

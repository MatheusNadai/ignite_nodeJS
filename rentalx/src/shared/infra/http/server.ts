import express, { NextFunction, Response, Request } from "express";
import swaggerUi from "swagger-ui-express";
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import "express-async-errors";
import swaggerFile from "../../../swagger.json";
import "@shared/infra/typeorm";
import "reflect-metadata";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server error - ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log("Server is Running"));

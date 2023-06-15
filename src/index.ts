import 'express-async-errors'
import "reflect-metadata";
import "./shared/containers";
import express, { Express } from "express";
import AppDataSource from "./data-source";
import routes from "./routes/router";
import { errorMiddleware } from "./middlewares/error";

AppDataSource.initialize().then(() => {
  const app: Express = express();

  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);

  return app.listen(process.env.PORT);
})

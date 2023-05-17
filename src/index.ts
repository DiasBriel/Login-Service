import "reflect-metadata";
import "./shared/containers";
import express, { Express } from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes/router";

AppDataSource.initialize().then(() => {
  const app: Express = express();
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT);
})

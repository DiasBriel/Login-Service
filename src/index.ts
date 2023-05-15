import express, { Express } from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  const app: Express = express();

  app.use(express.json())

  app.get('/', (req, res)=> {
    return res.json("Deu bom")
  })

  return app.listen(process.env.PORT)
})

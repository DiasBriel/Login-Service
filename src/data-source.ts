import "dotenv/config";
import { DataSource } from "typeorm";

let AppDataSource: DataSource;

if (process.env.NODE_ENV === "test") {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    migrationsTableName: "migrations",
  });
} else {
  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [`./src/**/entities/*.{ts,js}`],
    migrations: [`./src/**/migrations/*.{ts,js}`],
    migrationsTableName: "migrations",
    subscribers: [],
  });
}

export default AppDataSource;

export const closeConnectionDataSource = async () => {
  await AppDataSource.destroy()
}
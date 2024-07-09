import { DataSource } from "typeorm";
import { Item } from "./entities/Item";
import { appConfig } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: appConfig.DB_HOST,
  port: Number(appConfig.DB_PORT),
  username: appConfig.DB_USERNAME,
  password: appConfig.DB_PASSWORD,
  database: appConfig.DB_NAME,
  synchronize: true,
  // logging: true,
  entities: [Item],
});

import { DataSource } from "typeorm";
import { Item } from "./entities/Item";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "shopping-db",
  synchronize: true,
  // logging: true,
  entities: [Item],
});

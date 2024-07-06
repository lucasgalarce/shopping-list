import { DataSource } from "typeorm";
import { Task } from "./entities/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "shopping-db",
  synchronize: true,
  // logging: true,
  entities: [Task],
});

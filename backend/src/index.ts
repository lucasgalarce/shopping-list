import dotenv from "dotenv";

import app from "./app";
import { appConfig } from "./config";
import { AppDataSource } from "./db";

dotenv.config();

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(appConfig.PORT);
    console.log("Server on appConfig.port", appConfig.PORT);
  } catch (error) {
    console.error(error);
  }
}

main();

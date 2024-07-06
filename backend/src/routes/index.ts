import { Router } from "express";
import task from "./task.routes";

export default () => {
  const router = Router();

  task(router);

  return router;
};

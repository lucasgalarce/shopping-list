import { Router } from "express";
import item from "./item.routes";

export default () => {
  const router = Router();

  item(router);

  return router;
};
